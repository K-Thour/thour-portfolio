import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Login";
import Dashboard from "../../pages/Dashboard/index";
import ExperiencePage from "../../pages/Personal/Experience/index";
import { commonBundler } from "./commonBundler";
import NotFoundPage from "../../pages/NotFound";
import { Technologies } from "../../pages/Products/Technology/Index";
import ServicePage from "../../pages/Products/Service";
import ProjectPage from "../../pages/Products/Project";
import EducationPage from "../../pages/Personal/Education";

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
        path="/education"
        element={commonBundler({ component: <EducationPage /> })}
      />
      <Route
        path="/technologies"
        element={commonBundler({ component: <Technologies /> })}
      />
      <Route
        path="/services"
        element={commonBundler({ component: <ServicePage /> })}
      />
      <Route
        path="/projects"
        element={commonBundler({ component: <ProjectPage /> })}
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
