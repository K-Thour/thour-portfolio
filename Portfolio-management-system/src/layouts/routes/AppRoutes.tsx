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
import LeadPage from "../../pages/Engagement/Lead";
import ContactPage from "../../pages/Engagement/Contact";
import { Profile } from "../../pages/Personal/Profile";
import ProjectDetailPage from "../../pages/PublicPortfolio/DetailPage";
import PublicPortfolioOverviewPage from "../../pages/PublicPortfolio/OverviewPage";
import ShareProjectsPortfolio from "../../pages/Products/sharedPortfolio";
import ResumePage from "../../pages/Personal/Resume";
import Settings from "../../pages/Personal/Settings";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

function AppRoutes() {
  const resumePageEnable = useSelector(
    (state: RootState) => state.pageEnable.resumePageEnable,
  );
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={commonBundler({ component: <Profile /> })}
      />
      <Route
        path="/settings"
        element={commonBundler({ component: <Settings /> })}
      />
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
      {resumePageEnable && (
        <Route
          path="/resume"
          element={commonBundler({ component: <ResumePage /> })}
        />
      )}
      <Route
        path="/technologies"
        element={commonBundler({ component: <Technologies /> })}
      />
      <Route
        path="/services"
        element={commonBundler({ component: <ServicePage /> })}
      />
      <Route
        path="/leads"
        element={commonBundler({ component: <LeadPage /> })}
      />
      <Route
        path="/projects"
        element={commonBundler({ component: <ProjectPage /> })}
      />
      <Route
        path="/shared-portfolio"
        element={commonBundler({ component: <ShareProjectsPortfolio /> })}
      />
      <Route
        path="/contacts"
        element={commonBundler({ component: <ContactPage /> })}
      />
      <Route
        path="/publicPortfolio/overviewPage/:token"
        element={commonBundler({
          component: <PublicPortfolioOverviewPage />,
          isPublic: true,
          isLayoutRequired: true,
        })}
      />
      <Route
        path="/publicPortfolio/detailPage/:projectId"
        element={commonBundler({
          component: <ProjectDetailPage />,
          isPublic: true,
          isLayoutRequired: true,
        })}
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
