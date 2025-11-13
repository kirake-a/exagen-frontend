import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';

const SurveyCreationPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, statement: '', type: 'open' }]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { id: prev.length + 1, statement: '', type: 'open' }]);
  };

  const handleQuestionChange = (id: number, value: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, statement: value } : q)));
  };

  const handleSave = () => {
    console.log('Mock quiz created:', { title, questions });
    alert('Quiz created! (mock only, no backend yet)');
  };

  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="flex align-items-center justify-content-between">
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
              placeholder="Enter quiz title"
              className="w-full"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Questions</label>
            {questions.map((q) => (
              <div key={q.id} className="mb-3">
                <InputTextarea
                  value={q.statement}
                  onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                  placeholder={`Question ${q.id}`}
                  rows={2}
                  className="w-full"
                />
              </div>
            ))}
            <div className="flex justify-end mb-2">
              <Button label="Add Question" icon="pi pi-plus" onClick={handleAddQuestion} />
            </div>
          </div>
        </div>
      </Card>
      <div className="flex flex-col items-center gap-3 mt-5">
        <Button label="Create Quiz" icon="pi pi-check" severity="success" onClick={handleSave} />
      </div>
    </div>
  );
};

export default SurveyCreationPage;
