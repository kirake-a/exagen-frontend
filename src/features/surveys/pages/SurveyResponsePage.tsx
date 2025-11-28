import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

import { getSurveyById, createSurveyResponse } from "../../../common/api/surveyService";
import type { SurveyResponse } from "../../../common/interfaces/surveyInterfaces";


const SurveyResponsePage: React.FC = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState<SurveyResponse | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("IDDDD",id);
    const fetchSurvey = async () => {
      if (!id) return;
      setLoading(true);

      const res = await getSurveyById(id);

      setSurvey(res.data);
      setLoading(false);
    };

    fetchSurvey();
  }, [id]);

  const handleAnswer = (qId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (!id) return;


    const responseArray = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId: Number(questionId),
      selectedAnswer,
    }));

    console.log("Payload enviado:", answers);

    const res = await createSurveyResponse(id, responseArray);

    if (res.success) {
      setSubmitted(true);
    } else {
      alert("There was an error submitting your answers.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading survey...</p>;
  if (!survey) return <p className="text-center mt-10 text-red-500">Survey not found</p>;

  return (
    <div className="p-5">
      <Card title={survey.title}>
        {submitted ? (
          <p className="text-green-600 font-semibold text-center">
            Thank you for submitting your answers!
          </p>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select an answer</h3>

              {survey.closedQuestions?.map((q) => (
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
