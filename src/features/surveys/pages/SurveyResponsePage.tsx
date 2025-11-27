import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const SurveyResponsePage: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const quiz = {
    title: 'Survey Title Example',
    closedQuestions: [
      {
        id: '1',
        statement: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid'],
      },
    ],
    openQuestions: [
      {
        id: '2',
        statement: 'Explain why the sky appears blue.',
      },
    ],
  };

  const handleAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log('Mock submission:', answers);
    setSubmitted(true);
  };

  return (
    <div className="p-5">
      <Card title={quiz.title}>
        {submitted ? (
          <p className="text-green-600 font-semibold text-center">
            Thank you for submitting your answers!
          </p>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Multiple Choice</h3>
              {quiz.closedQuestions.map((q) => (
                <div key={q.id} className="mb-4">
                  <p className="font-medium mb-1">{q.statement}</p>
                  {q.options.map((opt) => (
                    <div key={opt} className="flex items-center mb-1">
                      <RadioButton
                        inputId={`${q.id}-${opt}`}
                        name={q.id}
                        value={opt}
                        onChange={(e) => handleAnswer(q.id, e.value)}
                        checked={answers[q.id] === opt}
                      />
                      <label htmlFor={`${q.id}-${opt}`} className="ml-2">
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Open Questions</h3>
              {quiz.openQuestions.map((q) => (
                <div key={q.id} className="mb-4">
                  <p className="font-medium mb-1">{q.statement}</p>
                  <InputTextarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    rows={3}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default SurveyResponsePage;
