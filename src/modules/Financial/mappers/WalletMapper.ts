import { Wallet } from './../domain/wallet/wallet';
import { Account as PersistenceAccount} from '@prisma/client'

import { Currency } from '../domain/wallet/currency';
import { Name } from '../domain/wallet/name';

export class WalletMapper {
  static toDomain(raw: PersistenceAccount): Wallet {
    const nameOrError = Name.create(raw.name)
    const currencyOrError = Currency.create(raw.currency)

    if(nameOrError.isLeft()){
      throw new Error('Name value is invalid.')
    }

    if(currencyOrError.isLeft()){
      throw new Error('Currency value is invalid.')
    }

    const accountOrError = Wallet.create(
      {
        name: nameOrError.value,
        currency: currencyOrError.value,
        userId: raw.user_id
      },
      raw.id
    )

    if(accountOrError.isRight()){
      return accountOrError.value
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
