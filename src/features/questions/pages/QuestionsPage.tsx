import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import type { OpenQuestion } from "../../../common/types/openQuestion";

export default function QuestionsPage() {
    
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [questions, setQuestions] = useState<OpenQuestion[]>([]);

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  useEffect(() => {
    fetchData();
  }, [search, status]);

  const fetchData = async () => {
    console.log("Fetching questions with filters:", { search, status });
    setQuestions([
      {
        id: 1, statement: "Math Question", dateCreated: "2025-11-01",
        dateModified: "",
        answer: "",
        category_id: 1
      },
      {
        id: 2, statement: "History Question", dateCreated: "2025-11-10",
        dateModified: "",
        answer: "",
        category_id: 1
      },
    ]);
  };

  const handleCreate = () => {
    navigate('/create-questions')
  };

  const actionTemplate = (rowData: OpenQuestion) => ( 
    <div className="flex gap-2">
      <p>{rowData.statement}</p>
      <Button icon="pi pi-eye" rounded text severity="info" tooltip="See" />
      <Button icon="pi pi-pencil" rounded text severity="warning" tooltip="Edit" />
      <Button icon="pi pi-trash" rounded text severity="danger" tooltip="Delete" />
    </div>
  );
  const navigate = useNavigate();
  return (
    <div className="p-5">
        <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center gap-2">
                <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
                <h2 className="m-0">Questions</h2>
            </div>

            <Button icon="pi pi-plus" label={`Create Question`} onClick={handleCreate} />
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

        <DataTable value={questions} responsiveLayout="scroll">
            <Column field="name" header="Exam Name" />
            <Column field="date" header="Date" />
            <Column body={actionTemplate} header="Actions" />
        </DataTable>
        </div>
  );
};
