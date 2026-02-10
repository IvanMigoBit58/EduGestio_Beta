"use client";

import { useState, useEffect } from "react";
import data from "./data.json";

export interface Student {
  id: string;
  name: string;
  surname: string;
}

export interface Group {
  id: string;
  name: string;
  students: Student[];
}

export interface AttendanceRecord {
  studentId: string;
  rCount: number;
  fCount: number;
}

export const getStudentsByGroup = (groupId: string): Student[] => {
  const group = data.groups.find((g: Group) => g.id === groupId);
  return group ? group.students : [];
};

const StudentRow = ({
  student,
  groupId,
  subject,
  isConvalidated = false,
  rCount,
  fCount,
  onRClick,
  onFClick,
  onAClick,
}: {
  student: Student;
  groupId: string;
  subject: string;
  isConvalidated?: boolean;
  rCount: number;
  fCount: number;
  onRClick: () => void;
  onFClick: () => void;
  onAClick: () => void;
}) => {
  const rowClassName = isConvalidated
    ? "flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-gray-200 dark:bg-gray-700 opacity-70"
    : "flex items-center justify-between border border-gray-200 rounded-lg p-4";

  const buttonClassName =
    "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium transition-colors";

  return (
    <div className={rowClassName}>
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-1">
          <p className={`font-medium ${isConvalidated ? "text-gray-600 dark:text-gray-300" : ""}`}>
            {student.name} {student.surname}
          </p>
          <p className={`text-sm ${isConvalidated ? "text-gray-500 dark:text-gray-400" : "text-muted-foreground"}`}>
            {student.id}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className={`text-xs ${isConvalidated ? "text-gray-500 dark:text-gray-400" : "text-muted-foreground"}`}>
            R:
          </span>
          <span className={`text-sm font-medium w-6 text-center ${isConvalidated ? "text-gray-600 dark:text-gray-300" : ""}`}>
            {rCount}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`text-xs ${isConvalidated ? "text-gray-500 dark:text-gray-400" : "text-muted-foreground"}`}>
            F:
          </span>
          <span className={`text-sm font-medium w-6 text-center ${isConvalidated ? "text-gray-600 dark:text-gray-300" : ""}`}>
            {fCount}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAClick}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "cursor-not-allowed opacity-50" : "hover:bg-green-500 hover:text-white"}`}
            aria-label={`Marcar assistència (A) de ${student.name}`}
          >
            A
          </button>
          <button
            onClick={onRClick}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "cursor-not-allowed opacity-50" : "hover:bg-orange-500 hover:text-white"}`}
            aria-label={`Marcar retard (R) de ${student.name}`}
          >
            R
          </button>
          <button
            onClick={onFClick}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "cursor-not-allowed opacity-50" : "hover:bg-red-500 hover:text-white"}`}
            aria-label={`Marcar falta (F) de ${student.name}`}
          >
            F
          </button>
        </div>
      </div>
    </div>
  );
};

export const AttendanceListComponent = ({
  groupId,
  subject = "",
}: {
  groupId: string;
  subject?: string;
}) => {
  const students = getStudentsByGroup(groupId);
  const recordsKey = `attendance_${groupId}_${subject || "general"}`;
  const [records, setRecords] = useState<Record<string, AttendanceRecord>>({});

  useEffect(() => {
    const stored = localStorage.getItem(recordsKey);
    if (stored) {
      try {
        const allRecords: AttendanceRecord[] = JSON.parse(stored);
        const recordsMap: Record<string, AttendanceRecord> = {};
        allRecords.forEach((record) => {
          recordsMap[record.studentId] = record;
        });
        setRecords(recordsMap);
      } catch (error) {
        console.error("Failed to load records", error);
      }
    }
  }, [recordsKey]);

  const getRecord = (studentId: string): AttendanceRecord => {
    return records[studentId] || { studentId, rCount: 0, fCount: 0 };
  };

  const updateRecord = (studentId: string, updates: Partial<AttendanceRecord>) => {
    const currentRecord = getRecord(studentId);
    const newRecord = { ...currentRecord, ...updates };
    setRecords((prev) => ({
      ...prev,
      [studentId]: newRecord,
    }));
  };

  const handleRClick = (studentId: string) => {
    const currentRecord = getRecord(studentId);
    const newRCount = currentRecord.rCount + 1;

    if (newRCount >= 3) {
      updateRecord(studentId, { rCount: 0, fCount: currentRecord.fCount + 1 });
    } else {
      updateRecord(studentId, { rCount: newRCount });
    }
  };

  const handleFClick = (studentId: string) => {
    const currentRecord = getRecord(studentId);
    updateRecord(studentId, { fCount: currentRecord.fCount + 1 });
  };

  const handleSave = () => {
    const allRecords: AttendanceRecord[] = students.map((student) => {
      const record = records[student.id];
      return record || { studentId: student.id, rCount: 0, fCount: 0 };
    });
    localStorage.setItem(recordsKey, JSON.stringify(allRecords));
  };

  if (!groupId || students.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Selecciona un grup per veure l'assistència
      </div>
    );
  }

  let convalidaciones: Array<{ studentId: string; groupId: string; subject: string }> = [];
  try {
    const stored = localStorage.getItem("convalidaciones");
    if (stored) {
      convalidaciones = JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse convalidaciones", error);
  }

  const regularStudents = students.filter((student) => {
    return !convalidaciones.some(
      (c) => c.studentId === student.id && c.groupId === groupId && c.subject === subject
    );
  });

  const convalidatedStudents = students.filter((student) => {
    return convalidaciones.some(
      (c) => c.studentId === student.id && c.groupId === groupId && c.subject === subject
    );
  });

  return (
    <div className="space-y-2">
      {regularStudents.map((student) => {
        const record = getRecord(student.id);
        return (
          <StudentRow
            key={`${student.id}_${subject}`}
            student={student}
            groupId={groupId}
            subject={subject}
            isConvalidated={false}
            rCount={record.rCount}
            fCount={record.fCount}
            onRClick={() => handleRClick(student.id)}
            onFClick={() => handleFClick(student.id)}
            onAClick={() => {}}
          />
        );
      })}
      {convalidatedStudents.length > 0 && (
        <>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-6 mb-2">
            Convalidats
          </div>
          {convalidatedStudents.map((student) => {
            const record = getRecord(student.id);
            return (
              <StudentRow
                key={`${student.id}_${subject}`}
                student={student}
                groupId={groupId}
                subject={subject}
                isConvalidated={true}
                rCount={record.rCount}
                fCount={record.fCount}
                onRClick={() => {}}
                onFClick={() => {}}
                onAClick={() => {}}
              />
            );
          })}
        </>
      )}
      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Desar
      </button>
    </div>
  );
};

export const renderStudentRows = (
  groupId: string,
  subject: string = ""
) => {
  return <AttendanceListComponent groupId={groupId} subject={subject} />;
};
