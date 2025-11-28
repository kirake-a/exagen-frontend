import { useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

import { useSurveys } from "../../../hooks/useSurvey"; 
import { deleteSurvey } from "../../../common/api/surveyService";
import type { SurveyResponse } from "../../../common/interfaces/surveyInterfaces";

export default function SurveysPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "ACTIVE" | "INACTIVE">("all");

  const { surveys, loading, fetchSurveys } = useSurveys(); 

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

const filteredSurveys = useMemo(() => {
  if (!surveys) return [];
  
  return surveys.filter((s) => {
    if (status !== "all" && s.surveyStatus !== status) return false;
    if (search.trim() !== "" && !s.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
}, [surveys, status, search]);

  const handleDelete = async (id: string) => {
    await deleteSurvey(id);
    fetchSurveys();
  };

  const actionTemplate = (row: SurveyResponse) => (
    <div className="flex gap-2 justify-end">
      <Button
        icon="pi pi-eye"
        rounded
        text
        severity="info"
        tooltip="See"
        onClick={() => navigate(`/surveys-summary/${row.id}`)}
      />

      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        tooltip="Delete"
        onClick={() => handleDelete(row.id)}
      />
    </div>
  );

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-2">
          <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="m-0">Surveys</h2>
        </div>

        <Button
          icon="pi pi-plus"
          label="Create Survey"
          onClick={() => navigate("/create-surveys")}
        />
      </div>

      <div className="flex gap-2 mb-3 align-items-center pt-5">
        <span className="p-input-icon-left grow">
          <InputText
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </span>

        <Dropdown
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.value)}
          placeholder="Status"
          className="w-10rem"
        />
      </div>

      <DataTable
        value={filteredSurveys}
        loading={loading}
        responsiveLayout="scroll"
      >
        <Column field="title" header="Survey Name" />
        <Column field="totalResponses" header="Responses" />
        <Column header="Status" body={(row) => row.surveyStatus} />

        <Column body={actionTemplate} header="Actions" />
      </DataTable>
    </div>
  );
}
