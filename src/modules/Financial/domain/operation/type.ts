import { Either, left, right } from "@core/logic/Either"
import { InvalidOperationTransactionTypeError } from "./errors/InvalidOperationTransactionTypeError"

export const validTransactionType = [
  'CreditCard',
  'Deposit',
  'FixedExpense',
  'VariableExpense'
] as const

export type ValidTransactionType = typeof validTransactionType[number]

export class Type {
  private readonly type: ValidTransactionType

  private constructor(type: ValidTransactionType){
    this.type = type
  }

  get value(): ValidTransactionType {
    return this.type
  }

  static validate(type: ValidTransactionType): boolean {
    if(!validTransactionType.includes(type)) return false

    return true
  }

  static create(type: ValidTransactionType): Either<InvalidOperationTransactionTypeError, Type>{
    if(!this.validate(type)){
      return left(new InvalidOperationTransactionTypeError())
    }

    return right(new Type(type))
  }

}
