import React, { useState, type FormEvent, type ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

type QuestionType = 'open' | 'closed';

interface QuestionData {
  questionType: QuestionType;
  questionText: string;
  answers: string[];
  correctAnswerIndex: number | null;
}

export const AddQuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      questionType: 'closed',
      questionText: '',
      answers: ['', '', '', ''],
      correctAnswerIndex: null,
    },
  ]);

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const showMessage = (
    severity: 'success' | 'warn' | 'error' | 'info',
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const handleQuestionChange = (index: number, field: keyof QuestionData, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex] = value;
    setQuestions(updated);
  };

  const addNewQuestionForm = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionType: 'closed',
        questionText: '',
        answers: ['', '', '', ''],
        correctAnswerIndex: null,
      },
    ]);
    showMessage('info', 'New Question', 'A new question form has been added.');
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated.length > 0
        ? updated
        : [
            {
              questionType: 'closed',
              questionText: '',
              answers: ['', '', '', ''],
              correctAnswerIndex: null,
            },
          ];
    });
    showMessage('warn', 'Question Deleted', `Question ${index + 1} removed.`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        showMessage('warn', 'Missing Question', `Question ${i + 1} has no text.`);
        return;
      }
      if (q.questionType === 'closed') {
        if (q.answers.some((a) => !a.trim())) {
          showMessage('warn', 'Incomplete Answers', `Question ${i + 1} has empty answers.`);
          return;
        }
        if (q.correctAnswerIndex === null) {
          showMessage(
            'warn',
            'Missing Correct Answer',
            `Question ${i + 1} has no correct answer selected.`
          );
          return;
        }
      }
    }

    console.log('Submitting all questions:', questions);
    showMessage('success', 'Saved', `${questions.length} questions submitted!`);
    setTimeout(() => navigate('/create-exams'), 1000);
  };

  const renderAnswerFields = (qIndex: number, q: QuestionData) => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Closed-Ended Options (Select One Correct)</h3>
      {q.answers.map((answer, aIndex) => (
        <div key={aIndex} className="flex items-center gap-3">
          <RadioButton
            inputId={`answer-${qIndex}-${aIndex}`}
            name={`correctAnswer-${qIndex}`}
            value={aIndex}
            onChange={() => handleQuestionChange(qIndex, 'correctAnswerIndex', aIndex)}
            checked={q.correctAnswerIndex === aIndex}
          />
          <InputText
            value={answer}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleAnswerChange(qIndex, aIndex, e.target.value)
            }
            placeholder={`Answer Option ${aIndex + 1}`}
            className="w-full"
            required
          />
        </div>
      ))}
      <p className="text-sm text-gray-500 mt-2">
        <strong>Requirement:</strong> There must always be <b>FOUR possible answers</b>, and one
        must be marked as correct.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-4xl mx-auto p-6">
      <Toast ref={toast} />

      <header className="text-center mt-8 mb-6">
        <h1 className="text-3xl font-semibold mb-2">Add New Question(s)</h1>
        <p className="text-gray-500 text-sm">
          You can create one or multiple questions below before saving them.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {questions.map((q, qIndex) => (
          <Card
            key={qIndex}
            title={`Question ${qIndex + 1}`}
            className="shadow-md border border-gray-100 relative"
          >
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId={`open-${qIndex}`}
                  name={`type-${qIndex}`}
                  value="open"
                  onChange={() => handleQuestionChange(qIndex, 'questionType', 'open')}
                  checked={q.questionType === 'open'}
                />
                <label htmlFor={`open-${qIndex}`} className="text-gray-700">
                  Open-Ended
                </label>
              </div>

              <div className="flex items-center gap-2">
                <RadioButton
                  inputId={`closed-${qIndex}`}
                  name={`type-${qIndex}`}
                  value="closed"
                  onChange={() => handleQuestionChange(qIndex, 'questionType', 'closed')}
                  checked={q.questionType === 'closed'}
                />
                <label htmlFor={`closed-${qIndex}`} className="text-gray-700">
                  Closed-Ended
                </label>
              </div>
            </div>

            <InputTextarea
              value={q.questionText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleQuestionChange(qIndex, 'questionText', e.target.value)
              }
              rows={4}
              className="w-full mb-4"
              placeholder="Enter the question text..."
              required
            />

            {q.questionType === 'closed' && renderAnswerFields(qIndex, q)}

            <div className="flex justify-end mt-5">
              <Button
                type="button"
                icon="pi pi-trash"
                label="Delete Question"
                className="p-button-danger"
                onClick={() => deleteQuestion(qIndex)}
              />
            </div>
          </Card>
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            label="Add Another Question"
            icon="pi pi-plus"
            className="p-button-info px-5"
            onClick={addNewQuestionForm}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            label="Save All Questions"
            icon="pi pi-save"
            className="p-button-success px-6"
          />
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPage;
