import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

import { createSurveys } from '../../../common/api/surveyService';
import type { Survey } from '../../../common/interfaces/surveyInterfaces';
import type { Toast, ToastMessage } from 'primereact/toast';
import { ClosedQuestionSelectorDialog } from './components/ClosedQuestionSelectorDialog';

const SurveyCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const showToast = (
    severity: ToastMessage['severity'],
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail, life: 2500 });
  };


  const handleSelectFromDialog = (questionId: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev
        : [...prev, questionId]
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      showToast("warn", "Title", "Title is required")
      return;
    }

    const payload: Survey = {
      title,
      surveyStatus: status,
      closedQuestionsIds: selectedQuestions
    };

    console.log("Creating survey:", payload);

    const res = await createSurveys(payload);

    if (res?.data) {
      showToast("success", "Survey Created", "Survey created sucessfuly" )
      navigate("/surveys");
    } else {
      showToast("error", "Error", "Could not create survey" )
    }
  };

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between mb-3">
        <div className="flex align-items-center gap-2">
          <Button icon="pi pi-arrow-left" text onClick={() => navigate(-1)} />
          <h2 className="m-0">Create New Survey</h2>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-4">
          
          <div>
            <label className="font-semibold block mb-2">Survey Title</label>
            <InputText
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter survey title"
              className="w-full"
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Status</label>
            <Dropdown
              value={status}
              options={statusOptions}
              onChange={(e) => setStatus(e.value)}
              className="w-full"
            />
          </div>
          <div className="p-4">
            <h2>Closed Questions</h2>
            <Button 
              label="Add Question" 
              severity="info"
              onClick={() => setDialogVisible(true)}
            />
              <div className="mt-3">
                {selectedQuestions.length === 0 && (
                  <p>No questions selected.</p>
                )}

                {selectedQuestions.map((id) => (
                  <div key={id} className="flex items-center gap-3 mb-2">
                    <span>Question ID: {id}</span>
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      onClick={() =>
                        setSelectedQuestions((prev) => prev.filter((q) => q !== id))
                      }
                    />
                  </div>
                ))}
              </div>

            <ClosedQuestionSelectorDialog
              visible={dialogVisible}
              onHide={() => setDialogVisible(false)}
              onSelect={handleSelectFromDialog}
            />
          </div>

        </div>
      </Card>

      <div className="flex justify-center mt-5">
        <Button 
          label="Create Survey" 
          icon="pi pi-check" 
          severity="success"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default SurveyCreationPage;
