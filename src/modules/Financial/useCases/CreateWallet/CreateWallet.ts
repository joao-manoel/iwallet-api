import { InvalidWalletNameWithUser } from './errors/InvalidWalletNameWithUser';
import { Either, left, right } from '@core/logic/Either';
import { IUsersRepository } from '@modules/Account/repositories/IUsersRepository';
import { IWalletsRepository } from "@modules/Financial/repositories/IWalletsRepository";
import { Name } from '@modules/Financial/domain/wallet/name';

import { Wallet } from './../../domain/wallet/wallet';
import { Currency } from './../../domain/wallet/currency';
import { ValidCurrencyTypes } from '../../domain/wallet/currency';
import { InvalidCurrencyError } from './../../domain/wallet/errors/InvalidCurrencyError';
import { InvalidWalletNameError } from './../../domain/wallet/errors/InvalidWalletNameError';
import { InvalidUserError } from './errors/InvalidUserError';

type CreateWalletRequest = {
  name: string
  currency: ValidCurrencyTypes
  userId: string
}

type CreateWalletResponse = Either<
  | InvalidWalletNameError
  | InvalidCurrencyError
  | InvalidWalletNameWithUser, Wallet>

export class CreateWallet{
  constructor(
    private walletsRepository: IWalletsRepository,
    private usersRepository: IUsersRepository
  ){}

  async execute({name, currency, userId}: CreateWalletRequest): Promise<CreateWalletResponse>{
    const nameOrError = Name.create(name)
    const currencyOrError = Currency.create(currency)

    if(nameOrError.isLeft()){
      return left(nameOrError.value)
    }

    if(currencyOrError.isLeft()){
      return left(currencyOrError.value)
    }

    const userExists = await this.usersRepository.findById(userId)

    if(!userExists){
      return left(new InvalidUserError())
    }

    const walletNameExists = await this.walletsRepository.findByNameWithUser(name, userId)

    if(walletNameExists){
      return left(new InvalidWalletNameWithUser(name))
    }

    const walletOrError = Wallet.create({
      name: nameOrError.value,
      currency: currencyOrError.value,
      userId: userId
    })

    if(walletOrError.isLeft()){
      return left(walletOrError.value)
    }

    const wallet = walletOrError.value

    await this.walletsRepository.create(wallet)


    return right(wallet)
  }
}
