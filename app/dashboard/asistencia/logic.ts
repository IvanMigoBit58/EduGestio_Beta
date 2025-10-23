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

export const renderStudentRows = (groupId: string): JSX.Element => {
  const students = getStudentsByGroup(groupId);

  if (!groupId || students.length === 0) {
    return <div className="text-center text-muted-foreground py-8">Selecciona un grup per veure l'assistència</div>;
  }

  return (
    <div className="space-y-2">
      {students.map((student) => (
        <div
          key={student.id}
          className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
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
            <input type="checkbox" className="w-5 h-5 cursor-pointer" aria-label={`Marcar assistència de ${student.name}`} />
          </div>
        </div>
      ))}
    </div>
  );
};