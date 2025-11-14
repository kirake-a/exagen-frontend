import { Routes, Route } from "react-router";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { ChangePasswordPage } from "../../features/auth/pages/ChangePasswordPage";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import  ExamsPage  from "../../features/exams/pages/ExamsPage";
import { MainLayout } from "../../features/layout/MainLayout";
import QuestionsPage from "../../features/questions/pages/QuestionsPage";
import SurveysPage  from "../../features/surveys/pages/SurveysPage";
import ExamCreationPage from "../../features/exams/pages/ExamCreationPage";
import QuestionAdditionPage from "../../features/questions/pages/QuestionAdditionPage";

export const AppRouter = () => {
  return (
    
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route element={<MainLayout />}>
          <Route path="/create-exams" element={<ExamCreationPage />} />
          <Route path="/create-questions" element={<QuestionAdditionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/surveys" element={<SurveysPage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};
