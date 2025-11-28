import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

import { createSurveys } from '../../../common/api/surveyService';
import type { Survey } from '../../../common/interfaces/surveyInterfaces';
import { useQuestions } from '../../../hooks/useQuestion';

const SurveyCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const { questions, loading } = useQuestions();

  const statusOptions = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const handleToggleQuestion = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
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
      alert("Survey created successfully!");
      navigate("/surveys");
    } else {
      alert("Error creating survey");
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
          <div>
            <label className="font-semibold block mb-2">Closed Questions</label>

            {loading && <p>Loading questions...</p>}

            {!loading && questions?.closedQuestions?.length === 0 && (
              <p>No closed questions available.</p>
            )}

            {!loading &&
              questions?.closedQuestions?.map((q) => (
                <div key={q.id} className="flex gap-2 align-items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={() => handleToggleQuestion(q.id)}
                  />
                  <span>{q.statement}</span>
                </div>
              ))
            }
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
