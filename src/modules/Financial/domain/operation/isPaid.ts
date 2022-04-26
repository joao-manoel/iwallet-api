import { Either, left, right } from "@core/logic/Either"
import { InvalidOperationIsPaidError } from "./errors/InvalidOperationIsPaidError"

export class isPaid {
  private readonly isPaid: boolean

  private constructor(data: boolean){
    this.isPaid = data
  }

  get value(): boolean {
    return this.isPaid
  }

  static validate(data: boolean): boolean {
    if(!isPaid || !Boolean(data)){
      return false
    }

    return true
  }

  static create(data: boolean): Either<InvalidOperationIsPaidError, isPaid>{
    if(!this.validate(data)){
      return left(new InvalidOperationIsPaidError())
    }

    return right(new isPaid(data))
  }
}
