import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import TodoRoutes from './routes/todos';
import { StatusCodes } from 'http-status-codes';

dotenv.config();
const app = express();
const PORT: number = +process.env.PORT || 3000;

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.use('/todos', TodoRoutes);

app.all('*', (req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
}

start();
