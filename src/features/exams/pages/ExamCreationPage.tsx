import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataScroller } from 'primereact/datascroller';

const questions = [
  { id: 1, text: 'Question 1 (Meets Criteria)', status: 'Approved' },
  { id: 2, text: 'Question 2 (Pending Review)', status: 'Pending' },
  { id: 3, text: 'Question 3 (Requires Edits)', status: 'Needs Revision' },
  { id: 4, text: 'Question 4 (Newly Added)', status: 'Draft' },
];

export const ExamCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const showInfo = (summary: string, detail: string) => {
    toast.current?.show({ severity: 'info', summary, detail, life: 2500 });
  };

  const handleDownloadPDF = (): void => {
    showInfo('Download', 'Simulating automatic PDF download...');
    console.log('PDF Download Triggered!');
  };

  const handleAddNewQuestion = (): void => {
    showInfo('Navigate', 'Navigate to the “Add Questions” page');
    console.log('Action: Add New Question');
    navigate('/add-questions');
  };

  const handleSelectExistedQuestions = (): void => {
    showInfo('Select', 'Opening question selection modal...');
    setShowModal(true);
  };

  const allQuestions = [
    { id: 1, text: 'What is React?', category: 1, type: 'open' },
    { id: 2, text: 'Select correct answer about Tailwind.', category: 2, type: 'closed' },
    { id: 3, text: 'Explain useState hook.', category: 1, type: 'open' },
    { id: 4, text: 'Which is not a JavaScript framework?', category: 3, type: 'closed' },
    { id: 5, text: 'Describe component lifecycle.', category: 4, type: 'open' },
  ];

  const filteredQuestions = allQuestions.filter((q) => {
    const matchCategory = categoryFilter ? q.category === categoryFilter : true;
    const matchType = typeFilter ? q.type === typeFilter : true;
    return matchCategory && matchType;
  });

  const categoryOptions = [
    { label: 'All Categories', value: null },
    { label: 'Category 1', value: 1 },
    { label: 'Category 2', value: 2 },
    { label: 'Category 3', value: 3 },
    { label: 'Category 4', value: 4 },
  ];

  const typeOptions = [
    { label: 'All Types', value: null },
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' },
  ];

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-2">
          <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="m-0">Create New Exam</h2>
        </div>
        <Button icon="pi pi-plus" label={`Add Question`} onClick={handleAddNewQuestion} />
      </div>

      <Toast ref={toast} />

      <main className="flex flex-col gap-6">
        <Card title="Configuration Settings (TO BE DEFINED)">
          <p className="text-gray-600">
            Placeholder: This area is for the <strong>TO BE DEFINED</strong> criteria...
          </p>
          <br />
          <p className="text-gray-500 text-sm">
            Configure your exam and collect the questions you want to include.
          </p>
        </Card>

        <Card title="Collected Questions">
          <div className="flex justify-end mb-2">
            <Button
              label="Select Existed Questions"
              icon="pi pi-list"
              className="p-button-secondary w-full md:w-auto"
              onClick={handleSelectExistedQuestions}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <DataScroller
              value={questions}
              rows={3}
              inline
              scrollHeight="250px"
              itemTemplate={(question) => (
                <div
                  key={question.id}
                  className="p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{question.text}</p>
                    <p className="text-sm text-gray-500">Status: {question.status}</p>
                  </div>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-sm"
                    tooltip="Delete Question"
                    onClick={() => console.log(`Deleted question: ${question.text}`)}
                  />
                </div>
              )}
            />
          </div>
        </Card>

        <div className="flex flex-col items-center gap-3">
          <Button
            label="Generate & Download Exam PDF"
            icon="pi pi-download"
            className="p-button-success w-full md:w-auto"
            onClick={handleDownloadPDF}
          />
          <p className="text-sm text-gray-500 text-center">
            The download occurs automatically when this button is clicked.
          </p>
        </div>
      </main>

      <Dialog
        header="Select Existing Questions"
        visible={showModal}
        onHide={() => setShowModal(false)}
        style={{ width: '50vw' }}
        modal
        className="p-4"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Dropdown
            value={categoryFilter}
            options={categoryOptions}
            onChange={(e) => setCategoryFilter(e.value)}
            placeholder="Filter by Category"
            className="w-full md:w-1/2"
          />
          <Dropdown
            value={typeFilter}
            options={typeOptions}
            onChange={(e) => setTypeFilter(e.value)}
            placeholder="Filter by Type"
            className="w-full md:w-1/2"
          />
        </div>

        <DataTable
          value={filteredQuestions}
          paginator
          rows={5}
          className="p-datatable-sm"
          emptyMessage="No questions found."
        >
          <Column field="id" header="ID" style={{ width: '10%' }} />
          <Column field="text" header="Question" style={{ width: '50%' }} />
          <Column field="category" header="Category" style={{ width: '10%' }} />
          <Column field="type" header="Type" style={{ width: '10%' }} />
          <Column
            header="Select"
            style={{ width: '20%' }}
            body={(rowData) => (
              <Button
                label="Select"
                icon="pi pi-check"
                className="p-button-sm p-button-success"
                onClick={() => {
                  console.log(`Selected question: ${rowData.text}`);
                  toast.current?.show({
                    severity: 'info',
                    summary: 'Question Selected',
                    detail: `You selected: "${rowData.text}"`,
                    life: 2000,
                  });
                }}
              />
            )}
          />
        </DataTable>

        <div className="flex justify-end mt-4">
          <Button
            label="Close"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => setShowModal(false)}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default ExamCreationPage;
