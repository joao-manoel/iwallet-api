import {CreditCard as PersistenceCreditCard} from '@prisma/client'

import { CreditCard } from '../domain/creditCard/creditCard';
import { Limit } from '../domain/creditCard/limit';
import { Name } from '../domain/creditCard/name';
import { Brand } from '../domain/creditCard/brand';

export class CreditCardMapper {
  static toDomain(raw: PersistenceCreditCard): CreditCard {
    const nameOrError = Name.create(raw.name)
    const limitOrError = Limit.create(raw.limit)
    const brandOrError = Brand.create(raw.brand)

    if(nameOrError.isLeft()){
      throw new Error('Name value is invalid.')
    }

    if(limitOrError.isLeft()){
      throw new Error('Limit value is invalid.')
    }

    if(brandOrError.isLeft()){
      throw new Error('Brand value is invalid.')
    }

    const creditCardOrError = CreditCard.create({
      name: nameOrError.value,
      brand: brandOrError.value,
      limit: limitOrError.value,
      userId: raw.user_id,
      walletId: raw.wallet_id
    }, raw.id)

    if(creditCardOrError.isRight()){
      return creditCardOrError.value
    }

    return null
  }

  static toPersistence(creditCard: CreditCard){
    return {
      id: creditCard.id,
      name: creditCard.name.value,
      limit: creditCard.limit.value,
      brand: creditCard.brand.value,

      user_id: creditCard.userId,
      wallet_id: creditCard.walletId
    }
  }
}
