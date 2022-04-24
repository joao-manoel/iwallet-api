import { Either } from "@core/logic/Either"
import { ICreditCardRepository } from "@modules/Financial/repositories/ICreditCardRepository"

type DeleteCreditCardRequest = {}

type DeleteCreditCardResponse = Either<Error, null>

export class DeleteCreditCard{
  constructor(private creditCardRepository: ICreditCardRepository){}

  async execute({}: DeleteCreditCardRequest): Promise<DeleteCreditCardResponse>{
    return
  }
}
