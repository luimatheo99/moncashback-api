import { Router } from 'express';

import { GetCompaniesController } from '../modules/companies/useCases/getCompanies/GetCompaniesController';
import { GetCompanyByPartnerController } from '../modules/companies/useCases/getCompanyByPartner/GetCompanyByPartnerController';
import { UpdateCompanyController } from '../modules/companies/useCases/updateCompany/UpdateCompanyController';

import { ensureAuthenticatePartner } from '../middlewares/ensureAuthenticatePartner';
import { ensureAuthenticateUser } from '../middlewares/ensureAuthenticateUser';

const getCompaniesController = new GetCompaniesController();
const getCompanyByPartnerController = new GetCompanyByPartnerController();
const updateCompanyController = new UpdateCompanyController();

const companiesRoutes = Router();

companiesRoutes.get('/getCompanies', ensureAuthenticateUser, getCompaniesController.handle);

companiesRoutes.get('/byPartner', ensureAuthenticatePartner, getCompanyByPartnerController.handle)

companiesRoutes.put('/updateCompany/:id', ensureAuthenticatePartner, updateCompanyController.handle);

export { companiesRoutes };
