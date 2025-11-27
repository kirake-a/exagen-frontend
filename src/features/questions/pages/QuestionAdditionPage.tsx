import React, { useState, type FormEvent, type ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { CategorySelector } from '../../exams/components/CategorySelectorExam';
import { CreateCategoryDialog } from '../../exams/components/CreateCategoryDialog';

import { useCategoriesQuestion } from '../../../hooks/useCategoriesQuestions';
import { createQuestion } from '../../../common/api/questionService';

import type { QuestionRequest, ClosedQuestion, OpenQuestion } from '../../../common/interfaces/questionInterface';
import { createCategoryQuestion } from '../../../common/api/categoryQuestionsService';

type LocalQuestion = {
  questionType: 'closed' | 'open';
  questionText: string;
  answers: string[];
  correctAnswerIndex: number | null;
};

export const QuestionAdditionPage: React.FC = () => {
  const [questions, setQuestions] = useState<LocalQuestion[]>([
    {
      questionType: 'closed',
      questionText: '',
      answers: ['', '', '', ''],
      correctAnswerIndex: null,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const { categories, fetchCategoriesQuestion } = useCategoriesQuestion();

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const showMessage = (severity: 'success' | 'warn' | 'error' | 'info', summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };


  const handleQuestionChange = <K extends keyof LocalQuestion>(
    index: number,
    field: K,
    value: LocalQuestion[K]
  ) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAnswerChange = (qIndex: number, aIndex: number, value: string) => {
    setQuestions(prev => {
      const updated = [...prev];
      const q = updated[qIndex];
      const newAnswers = [...q.answers];
      newAnswers[aIndex] = value;
      updated[qIndex] = { ...q, answers: newAnswers };
      return updated;
    });
  };

  const addNewQuestionForm = () => {
    setQuestions(prev => [
      ...prev,
      {
        questionType: 'closed',
        questionText: '',
        answers: ['', '', '', ''],
        correctAnswerIndex: null,
      },
    ]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(prev => {
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
  };
  const handleAddCategory = async (name: string) => {
    const res = await createCategoryQuestion(name);

    if (res.success) {
      console.log("Categoría creada:", res.data);
      fetchCategoriesQuestion();
      toast.current?.show({
        severity: "success",
        summary: "Category Created",
        detail: `Category "${name}" created successfully.`,
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: res.success
      })
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      showMessage('warn', 'Missing Category', 'Please select a category.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.questionText.trim()) {
        showMessage('warn', 'Missing Question', `Question ${i + 1} has no text.`);
        return;
      }

      if (q.questionType === 'closed') {
        if (q.answers.some(a => !a.trim())) {
          showMessage('warn', 'Incomplete Answers', `Question ${i + 1} has empty answers.`);
          return;
        }
        if (q.correctAnswerIndex == null) {
          showMessage('warn', 'Missing Correct Answer', `Question ${i + 1} requires a valid answer.`);
          return;
        }
      }
    }

    const closedQuestions: ClosedQuestion[] = questions
      .filter(q => q.questionType === 'closed')
      .map(q => ({
        statement: q.questionText,
        options: q.answers,
        correctAnswer: q.answers[q.correctAnswerIndex!],
      }));

    const openQuestions: OpenQuestion[] = questions
      .filter(q => q.questionType === 'open')
      .map(q => ({
        statement: q.questionText,
        response: q.answers[0] ?? '',
      }));

    const requestBody: QuestionRequest = {
      categoryId: selectedCategory,
      questions: {
        closedQuestions,
        openQuestions,
      },
    };

    console.log('FINAL REQUEST BODY:', requestBody);

    const res = await createQuestion(requestBody);

    if (res.success) {
      showMessage('success', 'Saved', 'Questions successfully created!');
      setTimeout(() => navigate('/create-exams'), 1000);
    } else {
      showMessage('error', 'Error', res.message ?? 'Error while saving.');
    }
  };

  const renderAnswerFields = (qIndex: number, q: LocalQuestion) => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Closed-Ended Options</h3>

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
          />
        </div>
      ))}
    </div>
  );

  const renderOpenAnswerField = (qIndex: number, q: LocalQuestion) => (
    <div>
      <h3 className="text-lg font-medium">Open-Ended Answer</h3>

      <InputTextarea
        value={q.answers[0] ?? ''}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          handleAnswerChange(qIndex, 0, e.target.value)
        }
        rows={3}
        className="w-full"
        placeholder="Expected answer..."
      />
    </div>
  );

  return (
    <div className="p-5">
      <Toast ref={toast} />
      <div className="mb-5">
        <CategorySelector
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
          onCreateCategory={() => setShowCreateCategory(true)}
          categories={categories}
        />
      </div>
      <CreateCategoryDialog
        visible={showCreateCategory}
        onHide={() => setShowCreateCategory(false)}
        onCreate={handleAddCategory}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {questions.map((q, qIndex) => (
          <Card key={qIndex} title={`Question ${qIndex + 1}`}>
            <div className="flex justify-content-between mb-4">
              <Button
                type="button"
                icon="pi pi-trash"
                label="Delete Question"
                className="p-button-danger"
                onClick={() => deleteQuestion(qIndex)}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId={`open-${qIndex}`}
                  name={`type-${qIndex}`}
                  value="open"
                  onChange={() => handleQuestionChange(qIndex, 'questionType', 'open')}
                  checked={q.questionType === 'open'}
                />
                <label htmlFor={`open-${qIndex}`}>Open</label>
              </div>

              <div className="flex items-center gap-2">
                <RadioButton
                  inputId={`closed-${qIndex}`}
                  name={`type-${qIndex}`}
                  value="closed"
                  onChange={() => handleQuestionChange(qIndex, 'questionType', 'closed')}
                  checked={q.questionType === 'closed'}
                />
                <label htmlFor={`closed-${qIndex}`}>Closed</label>
              </div>
            </div>

            <InputTextarea
              value={q.questionText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleQuestionChange(qIndex, 'questionText', e.target.value)
              }
              rows={3}
              className="w-full mt-3"
              placeholder="Enter the question..."
            />

            {q.questionType === 'closed' && renderAnswerFields(qIndex, q)}
            {q.questionType === 'open' && renderOpenAnswerField(qIndex, q)}
          </Card>
        ))}

        <div className="flex justify-center gap-4 mt-4">
          <Button icon="pi pi-plus" label="Add Another Question" onClick={addNewQuestionForm} />
          <Button type="submit" label="Save All" icon="pi pi-save" className="p-button-success" />
        </div>
      </form>
    </div>
  );
};

export default QuestionAdditionPage;
