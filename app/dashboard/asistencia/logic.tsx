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
}: {
  student: Student;
  groupId: string;
  subject: string;
  recordsKey: string;
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
    updateRecord({ rCount: record.rCount + 1 });
  };

  const handleFIClick = () => {
    updateRecord({ fiCount: record.fiCount + 1 });
  };

  const handleCClick = () => {
    updateRecord({ isConfinedC: !record.isConfinedC });
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <p className="font-medium">
            {student.name} {student.surname}
          </p>
          <p className="text-sm text-muted-foreground">{student.id}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-xs text-muted-foreground">R:</span>
          <span className="text-sm font-medium w-6 text-center">{record.rCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-muted-foreground">FI:</span>
          <span className="text-sm font-medium w-6 text-center">{record.fiCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-500 hover:text-white text-sm font-medium"
            aria-label={`Marcar assistència (A) de ${student.name}`}
          >
            A
          </button>
          <button
            onClick={handleRClick}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-orange-500 hover:text-white text-sm font-medium"
            aria-label={`Marcar retard (R) de ${student.name}`}
          >
            R
          </button>
          <button
            onClick={handleFIClick}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-red-500 hover:text-white text-sm font-medium"
            aria-label={`Marcar falta injustificada (FI) de ${student.name}`}
          >
            FI
          </button>
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-cyan-500 hover:text-white text-sm font-medium"
            aria-label={`Marcar falta justificada (FJ) de ${student.name}`}
          >
            FJ
          </button>
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-purple-500 hover:text-white text-sm font-medium"
            aria-label={`Marcar excedència (E) de ${student.name}`}
          >
            E
          </button>
          <button
            onClick={handleCClick}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium transition-colors ${
              record.isConfinedC
                ? "bg-gray-300 border-gray-400 text-white"
                : "border-gray-300 hover:bg-gray-300"
            }`}
            aria-label={`Marcar confinament (C) de ${student.name}`}
          >
            C
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

  const recordsKey = `attendance_${groupId}_${subject || "general"}`;

  return (
    <div className="space-y-2">
      {students.map((student) => (
        <StudentRow
          key={student.id}
          student={student}
          groupId={groupId}
          subject={subject}
          recordsKey={recordsKey}
        />
      ))}
    </div>
  );
};
