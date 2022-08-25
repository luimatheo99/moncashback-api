import { Router } from 'express';

import { CreateCashbackController } from '../modules/cashbacks/useCases/createCashback/CreateCashbackController';
import { GetCashbackController } from '../modules/cashbacks/useCases/getCashback/GetCashbackController';
import { GetCashbacksGridController } from '../modules/cashbacks/useCases/getCashbacksGrid/GetCashbacksGridController';
import { UpdateCashbackController } from '../modules/cashbacks/useCases/updateCashback/UpdateCashbackController';
import { DeleteCashbackController } from '../modules/cashbacks/useCases/deleteCashback/DeleteCashbackController';
import { GetCashbacksController } from '../modules/cashbacks/useCases/getCashbacks/GetCashbacksController';
import { GetCashbacksByIdPartnerController } from '../modules/cashbacks/useCases/getCashbacksByIdPartner/GetCashbacksByIdPartnerController';

import { ensureAuthenticatePartner } from '../middlewares/ensureAuthenticatePartner';

const createCashbackController = new CreateCashbackController();
const getCashbackController = new GetCashbackController();
const getCashbacksGridController = new GetCashbacksGridController();
const updateCashbackController = new UpdateCashbackController();
const deleteCashbackController = new DeleteCashbackController();
const getCashbacksController = new GetCashbacksController();
const getCashbacksByIdPartnerController = new GetCashbacksByIdPartnerController();

const cashbacksRoutes = Router();

cashbacksRoutes.post('/', ensureAuthenticatePartner, createCashbackController.handle);

cashbacksRoutes.get('/getCashback/:id', ensureAuthenticatePartner, getCashbackController.handle);

cashbacksRoutes.put('/updateCashback/:id', ensureAuthenticatePartner, updateCashbackController.handle);

cashbacksRoutes.delete('/deleteCashback/:id', ensureAuthenticatePartner, deleteCashbackController.handle);

cashbacksRoutes.get('/getCashbacksGrid/ByIdPartner', ensureAuthenticatePartner, getCashbacksGridController.handle);

cashbacksRoutes.get('/getCashbacks/company/:id_company', getCashbacksController.handle);

cashbacksRoutes.get('/getCashbacks/ByIdPartner', ensureAuthenticatePartner, getCashbacksByIdPartnerController.handle);

export { cashbacksRoutes };
