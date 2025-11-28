import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

import { useTests } from "../../../hooks/useTest";
import { deleteTest } from "../../../common/api/testService";
import {
  getAllQuestionsForTest,
  type QuestionData,
} from "../../../common/api/questionService"; 
import { handleDownloadPdfs } from "../../../common/utils/pdfGenerator";

export default function ExamsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>("all");

  const { tests, fetchTests } = useTests();

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this exam?");
    if (!confirmed) return;

    const res = await deleteTest(String(id));
    if (res.success) {
      fetchTests();
    }
  };

  const handleDownload = async (rowData: any) => {
    try {
      const questionsData: QuestionData = await getAllQuestionsForTest(rowData);

      await handleDownloadPdfs(rowData.title, questionsData);
    } catch (error) {
      console.error("Error downloading PDFs:", error);
      alert("Error al descargar los PDFs. Revisa la consola.");
    }
  };

  const handleCreate = () => {
    navigate("/create-exams");
  };

  const actionTemplate = (rowData: any) => (
    <div className="flex gap-2 justify-end">
      <Button
        icon="pi pi-download"
        rounded
        text
        severity="info"
        tooltip="Download PDFs"
        onClick={() => handleDownload(rowData)}
      />

      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        tooltip="Delete"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-2">
          <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="m-0">Exams</h2>
        </div>

        <Button icon="pi pi-plus" label="Create Exam" onClick={handleCreate} />
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

      <DataTable value={tests} responsiveLayout="scroll">
        <Column field="title" header="Exam Name" />
        <Column field="dateCreated" header="Date Created" />
        <Column body={actionTemplate} header="Actions" style={{ width: "120px" }} />
      </DataTable>
    </div>
  );
}