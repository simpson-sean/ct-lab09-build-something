import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogsController from '../controllers/dogs-controller.js';

const app = express();

app.use(express.json());

app.use('/api/v1/doggos', dogsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
