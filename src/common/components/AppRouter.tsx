import { Routes, Route, Navigate } from 'react-router';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { RegisterPage } from '../../features/auth/pages/RegisterPage';
import { ChangePasswordPage } from '../../features/auth/pages/ChangePasswordPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import ExamsPage from '../../features/exams/pages/ExamsPage';
import { MainLayout } from '../../features/layout/MainLayout';
import QuestionsPage from '../../features/questions/pages/QuestionsPage';
import SurveysPage from '../../features/surveys/pages/SurveysPage';
import ExamCreationPage from '../../features/exams/pages/ExamCreationPage';
import QuestionAdditionPage from '../../features/questions/pages/QuestionAdditionPage';
import SurveyCreationPage from '../../features/surveys/pages/SurveyCreationPage';
import SurveyResponsePage from '../../features/surveys/pages/SurveyResponsePage';
import ResponseSummaryPage from '../../features/surveys/pages/ResponseSummaryPage';
import { AuthProvider } from '../../context/AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';


export const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/create-exams" element={<ExamCreationPage />} />
            <Route path="/create-questions" element={<QuestionAdditionPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/surveys" element={<SurveysPage />} />
            <Route path="/surveys-summary/:id" element={<ResponseSummaryPage />} />
            <Route path="/create-surveys" element={<SurveyCreationPage />} />
          </Route>
        </Route>
        <Route path="/respond-surveys/:id" element={<SurveyResponsePage />} />{' '}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};
