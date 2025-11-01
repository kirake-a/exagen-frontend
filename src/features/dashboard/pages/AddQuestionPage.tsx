import React, { useState, type FormEvent, type ChangeEvent } from 'react';
type QuestionType = 'open' | 'closed';

import { useNavigate } from 'react-router-dom';

export const AddQuestionPage: React.FC = () => {
  const [questionType, setQuestionType] = useState<QuestionType>('closed');
  const [questionText, setQuestionText] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAnswerChange = (index: number, value: string): void => {
    const newAnswers: string[] = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (questionType === 'closed' && correctAnswerIndex === null) {
      alert('Please mark the correct answer for the closed question.');
      return;
    }
    console.log('Submitting Question:', {
      questionType,
      questionText,
      answers,
      correctAnswerIndex,
    });
    alert(`Question of type "${questionType}" submitted (frontend only)`);
    navigate('/create-exams');
  };

  const renderAnswerFields = () => (
    <div className="closedAnswers">
      {' '}
      <h3 className="answerHeader">Closed-Ended Options (Select One Correct)</h3>
      {answers.map((answer, index) => (
        <div key={index} className="answerRow">
          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswerIndex === index}
            onChange={() => setCorrectAnswerIndex(index)}
            className="radio"
            required={questionType === 'closed'}
          />
          <input
            type="text"
            value={answer}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleAnswerChange(index, e.target.value)
            }
            placeholder={`Answer Option ${index + 1}`}
            className="answerInput"
            required
          />
        </div>
      ))}
      <p className="requirementNote">
        REQUIREMENT: There must always be FOUR possible ANSWERS, and the CORRECT ANSWER must be
        MARKED.
      </p>
    </div>
  );

  return (
    <div className="container">
      {' '}
      <h1 className="header">Add New Question</h1>
      <form onSubmit={handleSubmit} className="form">
        {' '}
        <section className="section">
          <h2 className="subheader">Select Question Type</h2>
          <div className="typeSelector">
            <label className="radioLabel">
              <input
                type="radio"
                value="open"
                checked={questionType === 'open'}
                onChange={() => setQuestionType('open')}
              />{' '}
              Open-Ended
            </label>
            <label className="radioLabel">
              <input
                type="radio"
                value="closed"
                checked={questionType === 'closed'}
                onChange={() => setQuestionType('closed')}
              />{' '}
              Closed-Ended
            </label>
            <p className="note"> Only open and closed types are handled for the time being.</p>
          </div>
        </section>
        <section className="section">
          <h2 className="subheader">Question Text</h2>
          <textarea
            value={questionText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuestionText(e.target.value)}
            placeholder="Enter the main question text here..."
            className="textarea"
            required
          />
        </section>
        {questionType === 'closed' && <section className="section">{renderAnswerFields()}</section>}
        <div className="submitArea">
          <button type="submit" className="button">
            Save Question to System
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPage;
