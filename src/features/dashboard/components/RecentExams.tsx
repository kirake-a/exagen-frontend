import React from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface Exam {
  id: number;
  title: string;
  date: string;
  status: string;
}

export const RecentExams: React.FC = () => {
  const exams: Exam[] = [
    { id: 1, title: "Examen de Matemáticas", date: "2025-10-25", status: "Completado" },
    { id: 2, title: "Examen de Historia", date: "2025-10-27", status: "Pendiente" },
    { id: 3, title: "Examen de Inglés", date: "2025-10-29", status: "En progreso" },
  ];

  return (
    <Card title="Recent Exams" className="shadow-3">
      <DataTable value={exams} size="small" stripedRows responsiveLayout="scroll">
        <Column field="title" header="Title"></Column>
        <Column field="date" header="Date"></Column>
        <Column field="status" header="Status"></Column>
      </DataTable>
    </Card>
  );
};
