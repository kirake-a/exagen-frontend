import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ExamCreationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDownloadPDF = (): void => {
    alert('Simulating automatic PDF download...');
    console.log('PDF Download Triggered!');
  };

  const handleAddNewQuestion = (): void => {
    alert('Navegar a la página "Add Questions"');
    console.log('Action: Add New Question');
    navigate('/add-questions');
  };

  const handleSelectExistedQuestions = (): void => {
    alert('Abrir modal/página de selección de preguntas existentes.');
    console.log('Action: Select Existed Questions');
  };

  return (
    <div className="container">
      <h1 className="header">Create New Exam</h1>
      <div className="panel">
        <section className="section">
          <h2 className="subheader">Configuration Settings (TO BE DEFINED)</h2>
          <div className="configBox">
            <p>Placeholder: This area is for the TO BE DEFINED** criteria...</p>
          </div>
        </section>

        <section className="section">
          <h2 className="subheader">Collected Questions</h2>

          <div className="action-buttons-container">
            <button onClick={handleAddNewQuestion} className="button-action add-new">
              <a href="../pages/AddQuestionPage.tsx">Add New Question</a>
            </button>
            <button
              onClick={handleSelectExistedQuestions}
              className="button-action select-existing"
            >
              Select Existed Questions
            </button>
          </div>

          <div className="questionList">
            <p>
              System Requirement: The system must be able to collect all user-submitted questions...
            </p>
            <ul>
              <li>Question 1 (Meets Criteria)</li>
              <li>...</li>
            </ul>
          </div>
        </section>

        <div className="downloadArea">
          <button onClick={handleDownloadPDF} className="button">
            Generate & Download Exam PDF
          </button>
          <p className="note">The download occurs automatically when this button is clicked.</p>
        </div>
      </div>
    </div>
  );
};

export default ExamCreationPage;
