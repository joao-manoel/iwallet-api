import { Controller } from "@core/infra/Controller";
import { HttpResponse } from "@core/infra/HttpResponse";

type DeleteCreditCardControllerRequest = {}

export class DeleteCreditCardController implements Controller {
  handle: (request: any) => Promise<HttpResponse>;

}
