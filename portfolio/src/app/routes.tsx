import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { ServiceDetail } from './pages/ServiceDetail';
import { ProjectDetail } from './pages/ProjectDetail';

// Optional profile image - you can set this to your own image URL
const profileImage =
  'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTQxMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        element: <Home profileImage={profileImage} />,
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
    ],
  },
]);
