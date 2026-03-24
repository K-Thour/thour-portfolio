import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import Dashboard from "../../pages/Dashboard/index";
import ExperiencePage from "../../pages/Experience/index";
import { commonBundler } from "./commonBundler";
import NotFoundPage from "../../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={commonBundler({ component: <Dashboard /> })}
      />
      <Route
        path="/experience"
        element={commonBundler({ component: <ExperiencePage /> })}
      />
      <Route
        path="/*"
        element={commonBundler({
          component: <NotFoundPage />,
          isLayoutRequired: false,
        })}
      />
    </Routes>
  );
}

export default AppRoutes;
