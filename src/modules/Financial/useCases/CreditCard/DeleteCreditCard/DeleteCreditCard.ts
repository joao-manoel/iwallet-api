import { Either, left, right } from "@core/logic/Either"
import { ICreditCardRepository } from "@modules/Financial/repositories/ICreditCardRepository"
import { NotFoundCreditCardError } from "../errors/NotFoundCreditCardError"
import { UnauthorizedDeleteCreditCardError } from "../errors/UnauthorizedDeleteCreditCardError"

type DeleteCreditCardRequest = {
  id: string
  userId: string
}

type DeleteCreditCardResponse = Either<NotFoundCreditCardError | UnauthorizedDeleteCreditCardError, null>

export class DeleteCreditCard{
  constructor(private creditCardRepository: ICreditCardRepository){}

  async execute({id, userId}: DeleteCreditCardRequest): Promise<DeleteCreditCardResponse>{
    const creditCard = await this.creditCardRepository.findById(id)

    if(!creditCard){
      return left(new NotFoundCreditCardError())
    }

    if(creditCard.userId !== userId){
      return left(new UnauthorizedDeleteCreditCardError())
    }

    await this.creditCardRepository.delete(id)

    return right(null)
  }
}
