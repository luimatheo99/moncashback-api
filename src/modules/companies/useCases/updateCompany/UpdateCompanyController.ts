import { Request, Response } from "express";
import { UpdateCompanyUseCase } from "./UpdateCompanyUseCase";

export class UpdateCompanyController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { id_partner } = request;
    const {
      name,
      email,
      phone,
      facebook_url,
      instagram_url,
      site_url,
      logo,
      id_category,
      id_state,
      id_city,
      district,
      street,
      number,
      maximum_redeption_limit_perc,
    } = request.body;

    const updateCompanyUseCase = new UpdateCompanyUseCase();
    const result = await updateCompanyUseCase.execute({
      id,
      id_partner,
      name,
      email,
      phone,
      facebook_url,
      instagram_url,
      site_url,
      logo,
      id_category,
      id_state,
      id_city,
      district,
      street,
      number,
      maximum_redeption_limit_perc,
    })        

    return response.json(result);
  }
}
