import { Router } from 'express';

import { CreateTransactionController } from '../modules/transactions/useCases/createTransaction/CreateTransactionController';
import { GetTransactionsGridController } from '../modules/transactions/useCases/getTransactionsGrid/GetTransactionsGridController';
import { GetTransactionsByIdUserController } from '../modules/transactions/useCases/getTransactionsByIdUser/GetTransactionsByIdUserController';
import { UpdateTransactionCancelController } from '../modules/transactions/useCases/updateTransactionCancel/UpdateTransactionCancelController';

import { ensureAuthenticatePartner } from '../middlewares/ensureAuthenticatePartner';
import { ensureAuthenticateUser } from '../middlewares/ensureAuthenticateUser';

const createTransactionController = new CreateTransactionController();
const getTransactionsGridController = new GetTransactionsGridController();
const getTransactionsByIdUserController = new GetTransactionsByIdUserController();
const updateTransactionCancelController = new UpdateTransactionCancelController();

const transactionsRoutes = Router();

transactionsRoutes.post('/', ensureAuthenticatePartner, createTransactionController.handle);

transactionsRoutes.get('/getTransactionsGrid/byPartner', ensureAuthenticatePartner, getTransactionsGridController.handle);

transactionsRoutes.get('/getTransactions/user/:id_user', ensureAuthenticateUser, getTransactionsByIdUserController.handle);

transactionsRoutes.put('/updateTransaction/:id/cancel', ensureAuthenticatePartner, updateTransactionCancelController.handle);

export { transactionsRoutes };
