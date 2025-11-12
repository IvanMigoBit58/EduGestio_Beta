"use client";

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

export const getStudentsByGroup = (groupId: string): Student[] => {
  const group = data.groups.find((g: Group) => g.id === groupId);
  return group ? group.students : [];
};

export const renderStudentRows = (groupId: string) => {
  const students = getStudentsByGroup(groupId);

  if (!groupId || students.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">Selecciona un grup per veure l'assistència</div>
    );
  }

  return (
    <div className="space-y-2">
      {students.map((student) => (
        <div
          key={student.id}
          className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="font-medium">
                {student.name} {student.surname}
              </p>
              <p className="text-sm text-muted-foreground">{student.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
              aria-label={`Marcar assistència (A) de ${student.name}`}
            >
              A
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
              aria-label={`Marcar retard (R) de ${student.name}`}
            >
              R
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
              aria-label={`Marcar falta injustificada (FI) de ${student.name}`}
            >
              FI
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
              aria-label={`Marcar falta justificada (FJ) de ${student.name}`}
            >
              FJ
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
              aria-label={`Marcar excedència (E) de ${student.name}`}
            >
              E
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
              aria-label={`Marcar confinament (C) de ${student.name}`}
            >
              C
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
