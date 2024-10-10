import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import connectToDatabase from './config/db';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import catchErrors from './utils/catchErrors';
import { OK } from './constants/http';
import authRoutes from './routes/auth.route';
import authenticate from './middleware/authenticate';
import userRoutes from './routes/user.route';
import sessionRoutes from './routes/session.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get('/health', (req, res, next) => {
  return res.status(OK).json({ status: 'healthy!' });
});

app.use('/auth', authRoutes);
app.use('/user', authenticate, userRoutes);
app.use('/sessions', authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
