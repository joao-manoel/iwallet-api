import { Either, left, right } from "@core/logic/Either"
import { InvalidCategoryTransactionTypeError } from "./errors/InvalidCategoryTransactionTypeError"

export const validTransactionType = [
  'CreditCard',
  'Deposit',
  'FixedExpense',
  'VariableExpense'
]

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

  static create(type: ValidTransactionType): Either<InvalidCategoryTransactionTypeError, Type>{
    if(!this.validate(type)){
      return left(new InvalidCategoryTransactionTypeError())
    }

    return right(new Type(type))
  }

}
