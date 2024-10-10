import { Router } from 'express';
import { getUserHandler } from '../controller/user.controller';

const userRoutes = Router();

userRoutes.get('/', getUserHandler);

export default userRoutes;
