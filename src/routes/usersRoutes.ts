import { Router } from 'express';
import usersController from '../controllers/UsersController'
import { routes } from '../routes';
const usersRouter = Router();
usersRouter.post('/', usersController.create);


export { usersRouter };