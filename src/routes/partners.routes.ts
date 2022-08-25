import { Router } from 'express';

import { ensureAuthenticatePartner } from '../middlewares/ensureAuthenticatePartner';

import { GetPartnerController } from '../modules/partners/useCases/getPartner/GetPartnerController';
import { GetPartnerMeController } from '../modules/partners/useCases/getPartnerMe/GetPartnerMeController';

const partnersRoutes = Router();

const getPartnerController = new GetPartnerController();
const getPartnerMeController = new GetPartnerMeController();

partnersRoutes.get('/getPartner/:id', ensureAuthenticatePartner, getPartnerController.handle);

partnersRoutes.get('/getPartner/me', ensureAuthenticatePartner, getPartnerMeController.handle);

export { partnersRoutes };
