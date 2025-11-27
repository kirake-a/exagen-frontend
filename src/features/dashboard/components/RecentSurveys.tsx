import React from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Survey } from "../../../common/types/survey";

export const RecentSurveys: React.FC = () => {
  const surveys: Survey[] = [
    {
      id: 1, name: "Satisfacción del curso", responses: 35, createdAt: "2025-10-28",
      status: "Open"
    },
    {
      id: 2, name: "Evaluación docente", responses: 50, createdAt: "2025-10-27",
      status: "Closed"
    },
    {
      id: 3, name: "Feedback plataforma", responses: 22, createdAt: "2025-10-26",
      status: "Closed"
    },
  ];

  return (
    <Card title="Recent Surveys" className="shadow-3 mt-4">
      <DataTable value={surveys} size="small" stripedRows responsiveLayout="scroll">
        <Column field="name" header="Survey"></Column>
        <Column field="createdAt" header="Created At"></Column>
        <Column field="status" header="Status"></Column>
        <Column field="responses" header="Responses"></Column>
        
      </DataTable>
    </Card>
  );
};
