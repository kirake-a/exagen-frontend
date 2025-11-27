import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { QuestionSelectorDialog } from "../components/QuestionSelectDialog";
import { CategorySelector } from "../components/CategorySelectorExam";
import { CreateCategoryDialog } from "../components/CreateCategoryDialog";

import { useCategoriesTest } from "../../../hooks/useCategoriesTest";
import { useTests } from "../../../hooks/useTest";
import { createCategoryTest } from "../../../common/api/categoryTestService";
import { createTest, deleteTest } from "../../../common/api/testService";

export default function ExamCreationPage() {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const { categories, fetchCategoriesTest } = useCategoriesTest();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const [showSelector, setShowSelector] = useState(false);
  const [selectedClosedQuestions, setSelectedClosedQuestions] = useState<number[]>([]);
  const [selectedOpenQuestions, setSelectedOpenQuestions] = useState<number[]>([]);

  const { tests, fetchTests } = useTests();
  const [title, setTitle] = useState("");

  const [viewDialog, setViewDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);


  const showToast = (severity: string, summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 2500 });
  };

  const handleAddCategory = async (name: string) => {
    const result = await createCategoryTest(name);
    if (result.success) {
      fetchCategoriesTest();
      showToast("success", "Category Created", `Category "${name}" created.`);
    } else {
      showToast("error", "Error", "Could not create category.");
    }
  };

  const handleCreateExam = async () => {
    if (!selectedCategory) {
      showToast("warn", "Missing Category", "Select a category first.");
      return;
    }

    if (!title.trim()) {
      showToast("warn", "Missing Title", "Enter a title for the exam.");
      return;
    }

    const payload = {
      title,
      categoryId: selectedCategory,
      openQuestionsIds: selectedOpenQuestions,
      closedQuestionsIds: selectedClosedQuestions,
    };

    const res = await createTest(payload);

    if (res.success) {
      showToast("success", "Exam Created", "The exam has been saved.");
      setSelectedClosedQuestions([]);
      setSelectedOpenQuestions([]);
      setTitle("");
      fetchTests();
    } else {
      showToast("error", "Error", "Could not create exam.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    // const res = await deleteTest(id);

    // if (res.success) {
    //   showToast("success", "Deleted", "Exam deleted successfully.");
    //   fetchTests();
    // } else {
    //   showToast("error", "Error", "Could not delete exam.");
    // }
  };

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-2 mb-4">
          <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="m-0">Create New Exam</h2>
        </div>

        <Button
          icon="pi pi-plus"
          label="Add Question"
          onClick={() => navigate("/create-questions")}
        />
      </div>

      <Toast ref={toast} />

      <Card title="Exam Category" className="mb-4">
        <CategorySelector
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
          onCreateCategory={() => setShowCreateCategory(true)}
          categories={categories}
        />
      </Card>

      <Card title="Exam Title" className="mb-4">
        <input
          type="text"
          value={title}
          placeholder="Enter exam title..."
          onChange={(e) => setTitle(e.target.value)}
          className="p-inputtext w-full"
        />
      </Card>

      <Card title="Collected Questions">
        <div className="flex justify-end mb-2">
          <Button
            label="Select Questions"
            icon="pi pi-list"
            className="p-button-secondary"
            onClick={() => setShowSelector(true)}
          />
        </div>

        <ul className="list-none p-0">
          {selectedClosedQuestions.map((id) => (
            <li key={id} className="p-2 border-b">
              Closed Question #{id}
            </li>
          ))}

          {selectedOpenQuestions.map((id) => (
            <li key={id} className="p-2 border-b">
              Open Question #{id}
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-4 flex justify-center">
        <Button
          label="Create Exam"
          icon="pi pi-check"
          className="p-button-success w-full md:w-auto"
          onClick={handleCreateExam}
        />
      </div>

      {/* VIEW DIALOG */}
      <Dialog
        header="Exam Details"
        visible={viewDialog}
        style={{ width: "40vw" }}
        onHide={() => setViewDialog(false)}
      >
        {selectedTest && (
          <div>
            <p>
              <b>Title:</b> {selectedTest.title}
            </p>

            <p>
              <b>Category:</b> {selectedTest.categoryId}
            </p>

            <p className="mt-3">
              <b>Closed Questions:</b>
            </p>
            <ul>
              {selectedTest.closedQuestionsIds.map((id: number) => (
                <li key={id}>Closed #{id}</li>
              ))}
            </ul>

            <p className="mt-3">
              <b>Open Questions:</b>
            </p>
            <ul>
              {selectedTest.openQuestionsIds.map((id: number) => (
                <li key={id}>Open #{id}</li>
              ))}
            </ul>
          </div>
        )}
      </Dialog>

      <CreateCategoryDialog
        visible={showCreateCategory}
        onHide={() => setShowCreateCategory(false)}
        onCreate={handleAddCategory}
      />

      <QuestionSelectorDialog
        visible={showSelector}
        onHide={() => setShowSelector(false)}
        // onSelectedClosed={setSelectedClosedQuestions}
        // onSelectedOpen={setSelectedOpenQuestions}
        // selectedClosed={selectedClosedQuestions}
        // selectedOpen={selectedOpenQuestions}
      />
    </div>
  );
}


