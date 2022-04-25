import { Controller } from "@core/infra/Controller";
import { clientError, fail, HttpResponse, notFound, ok, unauthorized } from "@core/infra/HttpResponse";
import { NotFoundCreditCardError } from "../errors/NotFoundCreditCardError";
import { UnauthorizedDeleteCreditCardError } from "../errors/UnauthorizedDeleteCreditCardError";
import { DeleteCreditCard } from "./DeleteCreditCard";

type DeleteCreditCardControllerRequest = {
  id: string
  userId: string
}

export class DeleteCreditCardController implements Controller {

  constructor(private deleteCreditCard: DeleteCreditCard){}

  async handle({id, userId}: DeleteCreditCardControllerRequest): Promise<HttpResponse>{

    try {
      const result = await this.deleteCreditCard.execute({
        id,
        userId
      })

      if (result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case NotFoundCreditCardError:
            return notFound(error)
          case UnauthorizedDeleteCreditCardError:
            return unauthorized(error)
          default:
            return clientError(error)
        }
      }else {
        return ok()
      }
    } catch (err) {
      return fail(err)
    }

    return
  }

}
