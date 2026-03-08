import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { globalErrorHandler } from './common/asyncCommon.wrapper';
import routes from './routes';
import returnApiPrefix from './common/apiPrefix.common';
import { swaggerDocument } from './swagger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(globalErrorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(returnApiPrefix('user'), routes.userRoutes);
app.use(returnApiPrefix('technology'), routes.technologyRoutes);
app.use(returnApiPrefix('service'), routes.serviceRoutes);
app.use(returnApiPrefix('contact'), routes.contactRoutes);
app.use(returnApiPrefix('education'), routes.educationRoutes);
app.use(returnApiPrefix('experience'), routes.experienceRoutes);
app.use(returnApiPrefix('lead'), routes.leadRoutes);
app.use(returnApiPrefix('portfolio'), routes.portfolioRoutes);
app.use(returnApiPrefix('project'), routes.projectRoutes);
app.use(returnApiPrefix('resume'), routes.resumeRoutes);

export default app;
