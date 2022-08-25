import { Router } from 'express';

import { authenticatesRoutes } from './authenticates.routes';
import { usersRoutes } from './users.routes';
import { addressesRoutes } from './addresses.routes';
import { companiesRoutes } from './companies.routes';
import { partnersRoutes } from './partners.routes';
import { cashbacksRoutes } from './cashbacks.routes';
import { transactionsRoutes } from './transactions.routes';

const router = Router();

router.use(authenticatesRoutes);
router.use('/user', usersRoutes);
router.use('/address', addressesRoutes);
router.use('/company', companiesRoutes);
router.use('/partner', partnersRoutes);
router.use('/cashback', cashbacksRoutes);
router.use('/transaction', transactionsRoutes);

export { router };
