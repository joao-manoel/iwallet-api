import { Either, left, right } from "@core/logic/Either"
import { InvalidOperationValueError } from "./errors/InvalidOperationValueError"

export class Value{
  private readonly price: number

  private constructor(price: number){
    this.price = price
  }

  get value(){
    return this.price
  }

  static isFloat(n: number){
    return Number(n) === n && n % 1 !== 0;
  }

  static validate(price: number): boolean {
    if(!price || !this.isFloat(price)){
      return false
    }

    return true
  }

  static create(price: number): Either<InvalidOperationValueError, Value>{
    if(!this.validate(price)){
      return left(new InvalidOperationValueError())
    }

    return right(new Value(price))
  }
}
