import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import Dashboard from "../../pages/Dashboard/index";
import ExperiencePage from "../../pages/Experience/index";
import { commonBundler } from "./commonBundler";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={commonBundler(<Dashboard />)} />
      <Route path="/experience" element={commonBundler(<ExperiencePage />)} />
    </Routes>
  );
}

export default AppRoutes;
