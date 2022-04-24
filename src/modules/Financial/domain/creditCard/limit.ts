import { Either, left, right } from "@core/logic/Either"
import { InvalidCreditCardLimitError } from "./errors/InvalidCreditCardLimitError"

export class Limit {
  private readonly limit: number

  get value(): number {
    return this.limit
  }

  private constructor(limit: number){
    this.limit = limit
  }

  static validate(limit: number): boolean{
    if(!limit){
      return false
    }

    return true
  }

  static create(limit: number): Either<InvalidCreditCardLimitError, Limit>{
    if(!this.validate(limit)){
      return left(new InvalidCreditCardLimitError())
    }

    return right(new Limit(limit))
  }
}
