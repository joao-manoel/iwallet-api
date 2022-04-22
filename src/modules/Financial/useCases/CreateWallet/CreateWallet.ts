import { Either } from '@core/logic/Either';
import { Wallet } from '@prisma/client';
import { IWalletRepository } from "@modules/Financial/repositories/IWalletsRepository";
import { Name } from '@modules/Financial/domain/wallet/name';

import { InvalidWalletError } from './errors/InvalidWalletError';
import { ValidCurrencyTypes } from '../../domain/wallet/currency';

type CreateWalletRequest = {
  name: string
  currency: ValidCurrencyTypes
  userId: string
}

type CreateWalletResponse= Either<InvalidWalletError, Wallet>

export class CreateWallet{
  constructor(private WalletRepository: IWalletRepository){}

  async execute({name, currency, userId}: CreateWalletRequest): Promise<CreateWalletResponse>{
    const nameOrError = Name.create(name)
    return
  }
}
