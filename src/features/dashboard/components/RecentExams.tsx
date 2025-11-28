import React from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Exam } from "../../../common/types/exam";


export const RecentExams: React.FC = () => {
  const exams: Exam[] = [
    { id: 1, title: "Examen de Matemáticas", dateCreated: "2025-10-25", dateModified: "2025-10-25", openQuestions: [], closedQuestions: [] },
    { id: 2, title: "Examen de Historia",  dateCreated: "2025-10-25", dateModified: "2025-10-25", openQuestions: [], closedQuestions: [] },
    { id: 3, title: "Examen de Inglés",  dateCreated: "2025-10-25", dateModified: "2025-10-25", openQuestions: [], closedQuestions: [] },
  ];

  return (
    <Card title="Recent Exams" className="shadow-3">
      <DataTable value={exams} size="small" stripedRows responsiveLayout="scroll">
        <Column field="title" header="Title"></Column>
        <Column field="dateCreated" header="Date Created"></Column>
        <Column field="dateModified" header="Date Modified"></Column>
      </DataTable>
    </Card>
  );
};
