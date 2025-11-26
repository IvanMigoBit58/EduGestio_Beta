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
  fiCount: number;
  isConfinedC: boolean;
}

export const getStudentsByGroup = (groupId: string): Student[] => {
  const group = data.groups.find((g: Group) => g.id === groupId);
  return group ? group.students : [];
};

const StudentRow = ({
  student,
  groupId,
  subject,
  recordsKey,
  isConvalidated = false,
}: {
  student: Student;
  groupId: string;
  subject: string;
  recordsKey: string;
  isConvalidated?: boolean;
}) => {
  const [record, setRecord] = useState<AttendanceRecord>({
    studentId: student.id,
    rCount: 0,
    fiCount: 0,
    isConfinedC: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(recordsKey);
    if (stored) {
      const allRecords = JSON.parse(stored);
      const studentRecord = allRecords.find(
        (r: AttendanceRecord) => r.studentId === student.id
      );
      if (studentRecord) {
        setRecord(studentRecord);
      }
    }
  }, [recordsKey, student.id]);

  const updateRecord = (updates: Partial<AttendanceRecord>) => {
    const newRecord = { ...record, ...updates };
    setRecord(newRecord);

    const stored = localStorage.getItem(recordsKey);
    const allRecords = stored ? JSON.parse(stored) : [];
    const index = allRecords.findIndex(
      (r: AttendanceRecord) => r.studentId === student.id
    );
    if (index >= 0) {
      allRecords[index] = newRecord;
    } else {
      allRecords.push(newRecord);
    }
    localStorage.setItem(recordsKey, JSON.stringify(allRecords));
  };

  const handleRClick = () => {
    if (isConvalidated) return;
    const newRCount = record.rCount + 1;
    if (newRCount >= 3) {
      updateRecord({ rCount: 0, fiCount: record.fiCount + 1 });
    } else {
      updateRecord({ rCount: newRCount });
    }
  };

  const handleFIClick = () => {
    if (isConvalidated) return;
    updateRecord({ fiCount: record.fiCount + 1 });
  };

  const handleCClick = () => {
    if (isConvalidated) return;
    updateRecord({ isConfinedC: !record.isConfinedC });
  };

  const rowClassName = isConvalidated
    ? "flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-gray-200 dark:bg-gray-700 opacity-70"
    : "flex items-center justify-between border border-gray-200 rounded-lg p-4";

  const buttonClassName =
    "w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium transition-colors";

  const disabledButtonClassName = isConvalidated
    ? "border-gray-300 cursor-not-allowed opacity-50"
    : "border-gray-300 hover:bg-green-500 hover:text-white";

  return (
    <div className={rowClassName}>
      <div className="flex items-center space-x-4">
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
            {record.rCount}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`text-xs ${isConvalidated ? "text-gray-500 dark:text-gray-400" : "text-muted-foreground"}`}>
            FI:
          </span>
          <span className={`text-sm font-medium w-6 text-center ${isConvalidated ? "text-gray-600 dark:text-gray-300" : ""}`}>
            {record.fiCount}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {}}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "border-gray-300 cursor-not-allowed opacity-50" : "border-gray-300 hover:bg-green-500 hover:text-white"}`}
            aria-label={`Marcar assistència (A) de ${student.name}`}
          >
            A
          </button>
          <button
            onClick={handleRClick}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "border-gray-300 cursor-not-allowed opacity-50" : "border-gray-300 hover:bg-orange-500 hover:text-white"}`}
            aria-label={`Marcar retard (R) de ${student.name}`}
          >
            R
          </button>
          <button
            onClick={handleFIClick}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "border-gray-300 cursor-not-allowed opacity-50" : "border-gray-300 hover:bg-red-500 hover:text-white"}`}
            aria-label={`Marcar falta injustificada (FI) de ${student.name}`}
          >
            FI
          </button>
          <button
            onClick={() => {}}
            disabled={isConvalidated}
            className={`${buttonClassName} ${isConvalidated ? "border-gray-300 cursor-not-allowed opacity-50" : "border-gray-300 hover:bg-cyan-500 hover:text-white"}`}
            aria-label={`Marcar falta justificada (FJ) de ${student.name}`}
          >
            FJ
          </button>
        </div>
      </div>
    </div>
  );
};

export const renderStudentRows = (
  groupId: string,
  subject: string = ""
) => {
  const students = getStudentsByGroup(groupId);

  if (!groupId || students.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Selecciona un grup per veure l'assistència
      </div>
    );
  }

  // Separate convalidated and regular students
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

  const recordsKey = `attendance_${groupId}_${subject || "general"}`;

  return (
    <div className="space-y-2">
      {regularStudents.map((student) => (
        <StudentRow
          key={`${student.id}_${subject}`}
          student={student}
          groupId={groupId}
          subject={subject}
          recordsKey={recordsKey}
          isConvalidated={false}
        />
      ))}
      {convalidatedStudents.length > 0 && (
        <>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-6 mb-2">
            Convalidats
          </div>
          {convalidatedStudents.map((student) => (
            <StudentRow
              key={`${student.id}_${subject}`}
              student={student}
              groupId={groupId}
              subject={subject}
              recordsKey={recordsKey}
              isConvalidated={true}
            />
          ))}
        </>
      )}
    </div>
  );
};
