import { Router } from 'express';

import { GetStatesController } from '../modules/adresses/getStates/GetStatesController';
import { GetCitiesByStateController } from '../modules/adresses/getCitiesByState/GetCitiesByStateController';

import { ensureAuthenticatePartner } from '../middlewares/ensureAuthenticatePartner';

const getStatesController = new GetStatesController();
const getCitiesByStateController = new GetCitiesByStateController();

const addressesRoutes = Router();

addressesRoutes.get('/states', ensureAuthenticatePartner, getStatesController.handle);

addressesRoutes.get('/cities/state/:id_state', ensureAuthenticatePartner, getCitiesByStateController.handle);

export { addressesRoutes };
