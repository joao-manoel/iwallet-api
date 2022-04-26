import { Either, left, right } from "@core/logic/Either"
import { InvalidOperationPaidAtError } from "./errors/InvalidOperationPaidAtError"

export class PaidAt{
  private readonly paidAt: Date

  private constructor(data: Date){
    this.paidAt = data
  }

  get value(): Date{
    return this.paidAt
  }

  static validate(data: Date): boolean{
    if(!data){
      return false
    }

    return true
  }

  static create(data: Date): Either<InvalidOperationPaidAtError, PaidAt>{
    if(!this.validate(data)){
      return left(new InvalidOperationPaidAtError)
    }

    return right(new PaidAt(data))
  }
}
