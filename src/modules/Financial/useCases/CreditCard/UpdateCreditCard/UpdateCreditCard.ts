import { IWalletsRepository } from '@modules/Financial/repositories/IWalletsRepository';
import { InvalidCreditCardLimitError } from '@modules/Financial/domain/creditCard/errors/InvalidCreditCardLimitError';
import { Either, left, right } from "@core/logic/Either"
import { Brand } from "@modules/Financial/domain/creditCard/brand"
import { InvalidCreditCardBrandError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardBrandError"
import { InvalidCreditCardNameError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardNameError"
import { Limit } from "@modules/Financial/domain/creditCard/limit"
import { Name } from "@modules/Financial/domain/creditCard/name"
import { ICreditCardRepository } from "@modules/Financial/repositories/ICreditCardRepository"
import { brandTypesMap } from "../CreateCreditCard/CreateCreditCardController"
import { NotFoundCreditCardError } from "../errors/NotFoundCreditCardError"
import { InvalidNotFoundWalletError } from '../../Wallet/errors/InvalidNotFoundWalletError';

type UpdateCreditCardRequest = {
  id: string
  userId: string
  data: {
    name?: string
    brand?: string
    limit?: number
  }
}

type UpdateCreditCardResponse = Either<
  | NotFoundCreditCardError
  | InvalidCreditCardBrandError
  | InvalidCreditCardLimitError
  | InvalidCreditCardNameError,
  null>

export class UpdateCreditCard{
  constructor(
    private creditCardRepository: ICreditCardRepository
  ){}

  async execute({id, userId, data}: UpdateCreditCardRequest): Promise<UpdateCreditCardResponse>{
    const creditCard = await this.creditCardRepository.findByIdWithUser(id, userId)

    if(!creditCard){
      return left(new NotFoundCreditCardError())
    }

    if(data.name){
      const nameOrError = Name.create(data.name)

      if(nameOrError.isLeft()){
        return left(new InvalidCreditCardNameError(data.name))
      }

      creditCard.name = nameOrError.value
    }

    if(data.brand){
      const brandType = brandTypesMap[data.brand]
      const brandOrError = Brand.create(brandType)

      if(brandOrError.isLeft()){
        return left(new InvalidCreditCardBrandError())
      }

      creditCard.brand = brandOrError.value
    }

    if(data.limit){
      const limitOrError = Limit.create(data.limit)

      if(limitOrError.isLeft()){
        return left(new InvalidCreditCardLimitError())
      }

      creditCard.limit = limitOrError.value
    }

    await this.creditCardRepository.save(creditCard)

    return right(null)
  }
}
