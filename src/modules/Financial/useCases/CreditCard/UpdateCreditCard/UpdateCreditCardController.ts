import { Controller } from "@core/infra/Controller";
import { clientError, conflict, created, fail, HttpResponse, notFound } from "@core/infra/HttpResponse";
import { InvalidCreditCardBrandError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardBrandError";
import { InvalidCreditCardLimitError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardLimitError";
import { InvalidCreditCardNameError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardNameError";
import { NotFoundCreditCardError } from "../errors/NotFoundCreditCardError";
import { UpdateCreditCard } from "./UpdateCreditCard";

type UpdateCreditCardControllerRequest = {
  id: string,
  userId: string,
  data: {
    name?: string
    brand?: string
    limit?: number
  }
}

export class UpdateCreditCardController implements Controller {

  constructor(private updateCreditCard: UpdateCreditCard){}

  async handle({id, userId, data}: UpdateCreditCardControllerRequest): Promise<HttpResponse>{
    try {
      const result = await this.updateCreditCard.execute({
        id,
        userId,
        data
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case NotFoundCreditCardError:
            return notFound(error)
          case InvalidCreditCardBrandError:
          case InvalidCreditCardLimitError:
          case InvalidCreditCardNameError:
            return conflict(error)
          default:
            clientError(error)
        }
      }else {
        return created()
      }
    } catch (err) {
      return fail(err)
    }
  }

}
