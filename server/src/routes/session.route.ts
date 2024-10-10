import { Router } from 'express';
import {
  deleteSessionHandler,
  getSessionHandler,
} from '../controller/session.controller';

const sessionRoutes = Router();

sessionRoutes.get('/', getSessionHandler);
sessionRoutes.delete('/:id', deleteSessionHandler);

export default sessionRoutes;
