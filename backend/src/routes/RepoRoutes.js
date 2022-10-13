import express from 'express';
import RepoController from '../controllers/RepoController.js';
import { checkAuth } from '../helpers/checkAuth.js';
const routes = express.Router();

routes.get('/', checkAuth, RepoController.reposUser);
routes.post('/', checkAuth, RepoController.create);
routes.delete('/:id', checkAuth, RepoController.delete);
routes.get('/:id', checkAuth, RepoController.repoId);
routes.put('/:id', checkAuth, RepoController.update);

export default routes; 