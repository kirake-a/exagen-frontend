import { useState, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../../hooks/useQuestion";

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const [viewData, setViewData] = useState<any>(null);
  const [deleteData, setDeleteData] = useState<any>(null);

  const navigate = useNavigate();
  const { questions } = useQuestions();

  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ];

  const allQuestions = useMemo(() => {
    if (!questions) return [];

    const closed =
      questions.closedQuestions?.map((q) => ({
        ...q,
        type: "closed",
      })) || [];

    const open =
      questions.openQuestions?.map((q) => ({
        ...q,
        type: "open",
      })) || [];

    return [...closed, ...open];
  }, [questions]);

  // Filtros
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchesSearch = q.statement
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || status === null ? true : q.type === status;

      return matchesSearch && matchesStatus;
    });
  }, [allQuestions, search, status]);

  const handleCreate = () => navigate("/create-questions");

  const handleDelete = (row: any) => {
    console.log("Eliminando pregunta:", row);
    // Aquí iría el fetch DELETE real
    setDeleteData(null);
  };

  const actionTemplate = (rowData: any) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        rounded
        text
        severity="info"
        tooltip="See"
        onClick={() => setViewData(rowData)}
      />
      <Button
        icon="pi pi-trash"
        rounded
        text
        severity="danger"
        tooltip="Delete"
        onClick={() => setDeleteData(rowData)}
      />
    </div>
  );

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-2">
          <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="m-0">Questions</h2>
        </div>

        <Button icon="pi pi-plus" label="Create Question" onClick={handleCreate} />
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
          placeholder="Type"
          className="w-10rem"
        />
      </div>

      <DataTable value={filteredQuestions} responsiveLayout="scroll">
        <Column field="statement" header="Question" />
        <Column
          field="type"
          header="Type"
          body={(row) => (
            <Tag
              value={row.type === "closed" ? "Closed" : "Open"}
              severity={row.type === "closed" ? "info" : "success"}
            />
          )}
        />
        <Column  body={actionTemplate}
          header="Actions"
          style={{ textAlign: "right", width: "1%", 
          whiteSpace: "nowrap" }}
          bodyStyle={{ textAlign: "right" }}
        />
      </DataTable>

      <Dialog
        header="Question Details"
        visible={!!viewData}
        style={{ width: "30rem" }}
        modal
        onHide={() => setViewData(null)}
      >
        {viewData && (
          <div className="flex flex-column gap-3">
            <div>
              <strong>Statement:</strong>
              <p>{viewData.statement}</p>
            </div>

            {viewData.type === "closed" && (
              <>
                <div>
                  <strong>Options:</strong>
                  <ul>
                    {viewData.options.map((opt: string, i: number) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong>Correct Answer:</strong>
                  <Tag value={viewData.correctAnswer} severity="success" />
                </div>
              </>
            )}

            {viewData.type === "open" && (
              <Tag value="Open Question" severity="info" />
            )}
          </div>
        )}
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={!!deleteData}
        style={{ width: "25rem" }}
        modal
        onHide={() => setDeleteData(null)}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button
              label="Cancel"
              text
              onClick={() => setDeleteData(null)}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => handleDelete(deleteData)}
            />
          </div>
        }
      >
        {deleteData && (
          <p>
            Are you sure you want to delete:  
            <strong> "{deleteData.statement}"</strong>?
          </p>
        )}
      </Dialog>
    </div>
  );
}
