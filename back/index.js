import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import projectRoute from './src/controller/projectController.js';
import taskRoute from './src/controller/taskController.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/projects', projectRoute);
app.use('/projects', taskRoute);
app.listen(8000, () => {
  console.log(`app is listening on http://localhost:${8000}`);
});
