import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { ServiceDetail } from './pages/ServiceDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';
import { ErrorPage } from './pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'projects',
        Component: Projects,
      },
      {
        path: 'projects/:projectId',
        Component: ProjectDetail,
      },
      {
        path: 'services/:serviceId',
        Component: ServiceDetail,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
