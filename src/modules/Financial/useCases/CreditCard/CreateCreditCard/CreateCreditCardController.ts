import { Controller } from "@core/infra/Controller";
import { clientError, conflict, created, fail, HttpResponse, notFound, unauthorized } from "@core/infra/HttpResponse";
import { InvalidUserError } from "@modules/Account/domain/user/errors/InvalidUserError";
import { ValidBrandTypes } from "@modules/Financial/domain/creditCard/brand";
import { InvalidCreditCardBrandError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardBrandError";
import { InvalidCreditCardLimitError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardLimitError";
import { InvalidCreditCardNameError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardNameError";
import { InvalidAlreadyUsedNameError } from "../errors/InvalidAlreadyUsedNameError";
import { InvalidCreditCardCreateError } from "../errors/InvalidCreditCardCreateError";
import { InvalidWalletWithUserError } from "../errors/InvalidWalletWithUserError";
import { CreateCreditCard } from "./CreateCreditCard";

type CreateCreditCardControllerRequest = {
  name: string
  brand: string
  limit: number
  userId: string
  walletId: string
}

export const brandTypesMap: Record<string, ValidBrandTypes> = {
  AMERICANEXPRESS: 'AmericanExpress',
  BNDES: 'BNDES',
  DINNERS: 'Dinners',
  ELO: 'ELO',
  HIPERCARD: 'HiperCard',
  MASTERCARD: 'MasterCard',
  OTHER: 'Other',
  SOROCARD: 'SoroCard',
  VISA: 'Visa',
}

export class CreateCreditCardController implements Controller {

  constructor(private createCreditCard: CreateCreditCard){}

  async handle({name, brand, limit, userId, walletId}: CreateCreditCardControllerRequest): Promise<HttpResponse>{
    try{

      const brandType = brandTypesMap[brand]

      const result = await this.createCreditCard.execute({
        name,
        brand: brandType,
        limit,
        userId,
        walletId
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case InvalidUserError:
            return unauthorized(error)
          case InvalidCreditCardNameError:
          case InvalidCreditCardBrandError:
          case InvalidCreditCardLimitError:
          case InvalidAlreadyUsedNameError:
            return conflict(error)
          case InvalidWalletWithUserError:
            return notFound(error)
          case InvalidCreditCardCreateError:
            return fail(error)
          default: clientError(error)
        }
      } else {
        return created()
      }

    } catch(err){
      return fail(err)
    }
  }

}
