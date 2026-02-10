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
  selected: "R" | "F" | null;
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
  selected,
  onSelectionChange,
}: {
  student: Student;
  groupId: string;
  subject: string;
  isConvalidated?: boolean;
  selected: "R" | "F" | null;
  onSelectionChange: (value: "R" | "F" | null) => void;
}) => {
  const rowClassName = isConvalidated
    ? "flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-gray-200 dark:bg-gray-700 opacity-70"
    : "flex items-center justify-between border border-gray-200 rounded-lg p-4";

  const buttonClassName =
    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors";

  const getButtonClassName = (value: "R" | "F") => {
    const isSelected = selected === value;
    const baseClass = `${buttonClassName}`;

    if (isConvalidated) {
      return `${baseClass} border-gray-300 cursor-not-allowed opacity-50`;
    }

    if (value === "R") {
      return `${baseClass} ${
        isSelected
          ? "bg-orange-500 text-white border-orange-600"
          : "border-gray-300 hover:bg-orange-500 hover:text-white"
      }`;
    } else {
      return `${baseClass} ${
        isSelected
          ? "bg-red-500 text-white border-red-600"
          : "border-gray-300 hover:bg-red-500 hover:text-white"
      }`;
    }
  };

  const handleClick = (value: "R" | "F") => {
    if (isConvalidated) return;
    onSelectionChange(selected === value ? null : value);
  };

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
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleClick("R")}
          disabled={isConvalidated}
          className={getButtonClassName("R")}
          aria-label={`Marcar retard (R) de ${student.name}`}
        >
          R
        </button>
        <button
          onClick={() => handleClick("F")}
          disabled={isConvalidated}
          className={getButtonClassName("F")}
          aria-label={`Marcar falta (F) de ${student.name}`}
        >
          F
        </button>
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
  const [selections, setSelections] = useState<
    Record<string, "R" | "F" | null>
  >({});

  useEffect(() => {
    const stored = localStorage.getItem(recordsKey);
    if (stored) {
      try {
        const allRecords: AttendanceRecord[] = JSON.parse(stored);
        const selectionsMap: Record<string, "R" | "F" | null> = {};
        allRecords.forEach((record) => {
          selectionsMap[record.studentId] = record.selected;
        });
        setSelections(selectionsMap);
      } catch (error) {
        console.error("Failed to load selections", error);
      }
    }
  }, [recordsKey]);

  const handleSelectionChange = (studentId: string, value: "R" | "F" | null) => {
    setSelections((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSave = () => {
    const records: AttendanceRecord[] = students.map((student) => ({
      studentId: student.id,
      selected: selections[student.id] || null,
    }));
    localStorage.setItem(recordsKey, JSON.stringify(records));
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
      {regularStudents.map((student) => (
        <StudentRow
          key={`${student.id}_${subject}`}
          student={student}
          groupId={groupId}
          subject={subject}
          isConvalidated={false}
          selected={selections[student.id] || null}
          onSelectionChange={(value) => handleSelectionChange(student.id, value)}
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
              isConvalidated={true}
              selected={selections[student.id] || null}
              onSelectionChange={(value) => handleSelectionChange(student.id, value)}
            />
          ))}
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
