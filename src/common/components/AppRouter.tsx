import { Routes, Route } from "react-router";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { ChangePasswordPage } from "../../features/auth/pages/ChangePasswordPage";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ChangePasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};
