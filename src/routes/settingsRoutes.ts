import { Router } from 'express';
import settingsController from '../controllers/SettingsController'
import { routes } from '../routes';

const settingsRouter = Router();

settingsRouter.post('/', settingsController.create);
settingsRouter.get('/:username', settingsController.findByUsername);
settingsRouter.get('/',settingsController.index );
settingsRouter.put('/:username', settingsController.update);



export { settingsRouter };