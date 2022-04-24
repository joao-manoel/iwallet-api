import { Controller } from "@core/infra/Controller";
import { HttpResponse } from "@core/infra/HttpResponse";

type CreateCreditCardControllerRequest = {}

export class CreateCreditCardController implements Controller {
  handle: (request: any) => Promise<HttpResponse>;

}
