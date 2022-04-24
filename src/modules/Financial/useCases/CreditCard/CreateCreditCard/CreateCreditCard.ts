import { Either } from "@core/logic/Either"
import { ICreditCardRepository } from "@modules/Financial/repositories/ICreditCardRepository"

type CreateCreditCardRequest = {}

type CreateCreditCardResponse = Either<Error, null>

export class CreateCreditCard{
  constructor(private creditCardRepository: ICreditCardRepository){}

  async execute({}: CreateCreditCardRequest): Promise<CreateCreditCardResponse>{
    return
  }
}
