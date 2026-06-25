import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { globalErrorHandler } from './common/asyncCommon.wrapper';
import routes from './routes';
import returnApiPrefix from './common/apiPrefix.common';
import { swaggerDocument } from './swagger';

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "50mb",
}));
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

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
app.use(returnApiPrefix('dashboard'), routes.dashboardRoutes);
app.use(returnApiPrefix('image'), routes.imageRoutes);

app.use(globalErrorHandler);

export default app;
