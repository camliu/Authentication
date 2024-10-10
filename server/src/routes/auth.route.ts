import { Router } from 'express';
import {
  emailVerifyHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetHandler,
} from '../controller/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', registerHandler);
authRoutes.post('/login', loginHandler);
authRoutes.get('/logout', logoutHandler);
authRoutes.get('/refresh', refreshHandler);
authRoutes.get('/email/verify/:code', emailVerifyHandler);
authRoutes.post('/password/forgot', sendPasswordResetHandler);
authRoutes.post('/password/reset', resetPasswordHandler);

export default authRoutes;
