import { Controller } from "@core/infra/Controller";
import { HttpResponse } from "@core/infra/HttpResponse";

type UpdateCreditCardControllerRequest = {}

export class UpdateCreditCardController implements Controller {
  handle: (request: any) => Promise<HttpResponse>;

}
