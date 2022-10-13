import express, { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { checkAuth } from '../helpers/checkAuth.js';
const routes = express.Router();

routes.post('/login', UserController.login);
routes.post('/', UserController.create);

routes.get('/', checkAuth, UserController.list);

export default routes; 