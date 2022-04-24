import { Either } from "@core/logic/Either"
import { ICreditCardRepository } from "@modules/Financial/repositories/ICreditCardRepository"

type UpdateCreditCardRequest = {}

type UpdateCreditCardResponse = Either<Error, null>

export class DeleteCreditCard{
  constructor(private creditCardRepository: ICreditCardRepository){}

  async execute({}: UpdateCreditCardRequest): Promise<UpdateCreditCardResponse>{
    return
  }
}
