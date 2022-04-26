import { Operation as PersistenceOperation } from '@prisma/client'
import { isPaid } from '../domain/operation/isPaid'
import { Name } from '../domain/operation/name'
import { Operation } from '../domain/operation/operation'
import { PaidAt } from '../domain/operation/paidAt'
import { Type } from '../domain/operation/type'
import { Value } from '../domain/operation/value'

export class OperationMapper {
  static toDomain(raw: PersistenceOperation): Operation {
    const nameOrError = Name.create(raw.name)
    const typeOrError = Type.create(raw.type)
    const valueOrError = Value.create(raw.value)
    const paidAtOrError = PaidAt.create(raw.paid_at)
    const isPaidOrError = isPaid.create(raw.is_paid)

    if(nameOrError.isLeft()){
      throw new Error('Name value is invalid.')
    }

    if(typeOrError.isLeft()){
      throw new Error('Type value is invalid.')
    }

    if(valueOrError.isLeft()){
      throw new Error('Value value is invalid.')
    }

    if(paidAtOrError.isLeft()){
      throw new Error('PaidAt value is invalid.')
    }

    if(isPaidOrError.isLeft()){
      throw new Error('isPaid value is invalid.')
    }

    const operationOrError = Operation.create({
      name: nameOrError.value,
      type: typeOrError.value,
      value: valueOrError.value,
      paidAt: paidAtOrError.value,
      isPaid: isPaidOrError.value,
      userId: raw.user_id,
      walletId: raw.wallet_id,
      categoryId: raw.category_id,
      creditCardId: raw.creditCard_id
    },
      raw.id
    )

    if(operationOrError.isRight()){
      return operationOrError.value
    }

    return null
  }

  static toPersistence(operation: Operation){
    return {
      id: operation.id,
      name: operation.name.value,
      type: operation.type.value,
      value: operation.value.value,
      paid_at: operation.paidAt.value,
      is_paid: operation.isPaid.value,
      user_id: operation.userId,
      wallet_id: operation.walletId,
      category_id: operation.categoryId,
      creditCard_id: operation.creditCardId
    }
  }
}
