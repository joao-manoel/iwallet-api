import { Wallet } from './../domain/wallet/wallet';
import { Wallet as PersistenceWallet} from '@prisma/client'

import { Currency } from '../domain/wallet/currency';
import { Name } from '../domain/wallet/name';

export class WalletMapper {
  static toDomain(raw: PersistenceWallet): Wallet {
    const nameOrError = Name.create(raw.name)
    const currencyOrError = Currency.create(raw.currency)

    if(nameOrError.isLeft()){
      throw new Error('Name value is invalid.')
    }

    if(currencyOrError.isLeft()){
      throw new Error('Currency value is invalid.')
    }

    const walletOrError = Wallet.create(
      {
        name: nameOrError.value,
        currency: currencyOrError.value,
        userId: raw.user_id
      },
      raw.id
    )

    if(walletOrError.isRight()){
      return walletOrError.value
    }

    return null
  }

  static toPersistence(wallet: Wallet){
    return {
      id: wallet.id,
      name: wallet.name.value,
      currency: wallet.currency.value,
      user_id: wallet.userId
    }
  }
}
