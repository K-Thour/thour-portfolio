import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import cors from 'cors';
import { globalErrorHandler } from './common/asyncCommon.wrapper';
import routes from './routes';
import returnApiPrefix from './common/apiPrefix.common';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(globalErrorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(returnApiPrefix('user'), routes.userRoutes);

export default app;
