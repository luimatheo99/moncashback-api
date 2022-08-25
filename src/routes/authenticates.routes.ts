import { Router } from 'express';

import { AuthenticateUserController } from '../modules/account/authenticateUser/useCases/AuthenticateUserController';
import { AuthenticatePartnerController } from '../modules/account/authenticatePartner/useCases/AuthenticatePartnerController';

const authenticatesRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const authenticatePartnerController = new AuthenticatePartnerController();

authenticatesRoutes.post('/user/authenticate', authenticateUserController.handle);
authenticatesRoutes.post('/partner/authenticate', authenticatePartnerController.handle);

export { authenticatesRoutes };
