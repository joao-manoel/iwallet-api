import { right } from './../../../../../core/logic/Either';
import { Either, left } from "@core/logic/Either"
import { InvalidUserError } from "@modules/Account/domain/user/errors/InvalidUserError"
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository"
import { Brand, ValidBrandTypes } from "@modules/Financial/domain/creditCard/brand"
import { Limit } from "@modules/Financial/domain/creditCard/limit"
import { Name } from "@modules/Financial/domain/creditCard/name"
import { ICreditCardRepository } from "@modules/Financial/repositories/ICreditCardRepository"
import { InvalidCreditCardNameError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardNameError"
import { InvalidCreditCardBrandError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardBrandError"
import { InvalidCreditCardLimitError } from "@modules/Financial/domain/creditCard/errors/InvalidCreditCardLimitError"
import { InvalidAlreadyUsedNameError } from "../errors/InvalidAlreadyUsedNameError"
import { CreditCard } from "@modules/Financial/domain/creditCard/creditCard"
import { InvalidCreditCardCreateError } from "../errors/InvalidCreditCardCreateError"
import { IWalletsRepository } from '@modules/Financial/repositories/IWalletsRepository';
import { InvalidWalletWithUserError } from '../errors/InvalidWalletWithUserError';

type CreateCreditCardRequest = {
  name: string
  brand: ValidBrandTypes
  limit: number
  userId: string
  walletId: string
}

type CreateCreditCardResponse = Either<
  | InvalidUserError
  | InvalidCreditCardNameError
  | InvalidCreditCardBrandError
  | InvalidCreditCardLimitError
  | InvalidAlreadyUsedNameError
  | InvalidCreditCardCreateError
  | InvalidWalletWithUserError
, CreditCard>

export class CreateCreditCard{
  constructor(
    private creditCardsRepository: ICreditCardRepository,
    private walletsRepository: IWalletsRepository,
    private usersRepository: IUsersRepository
    ){}

  async execute({name, brand, limit, userId, walletId}: CreateCreditCardRequest): Promise<CreateCreditCardResponse>{
    const nameOrError = Name.create(name)
    const brandOrError = Brand.create(brand)
    const limitOrError = Limit.create(limit)

    const userExists = await this.usersRepository.findById(userId)

    if(!userExists){
      return left(new InvalidUserError())
    }

    const walletExistsWithUser = await this.walletsRepository.findByIdWithUser(walletId, userId)

    if(!walletExistsWithUser){
      return left(new InvalidWalletWithUserError())
    }

    if(nameOrError.isLeft()){
      return left(new InvalidCreditCardNameError(name))
    }

    if(brandOrError.isLeft()){
      return left(new InvalidCreditCardBrandError())
    }

    if(limitOrError.isLeft()){
      return left(new InvalidCreditCardLimitError())
    }

    const AlreadyUsedNameCreditCard = await this.creditCardsRepository.findByNameWithUser(name, userId)

    if(AlreadyUsedNameCreditCard){
      return left(new InvalidAlreadyUsedNameError(name))
    }
    const creditCardOrError = CreditCard.create({
      name: nameOrError.value,
      brand: brandOrError.value,
      limit: limitOrError.value,
      userId: userId,
      walletId: walletId
    })

    if(creditCardOrError.isLeft()){
      return left(new InvalidCreditCardCreateError())
    }

    const creditCard = creditCardOrError.value

    await this.creditCardsRepository.create(creditCard)


    return right(creditCard)
  }
}
