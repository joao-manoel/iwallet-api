import { Either, left, right } from "@core/logic/Either"
import { InvalidCreditCardNameError } from "./errors/InvalidCreditCardNameError"

export class Name {
  private readonly name: string

  get value(): string {
    return this.name
  }

  private constructor(name: string){
    this.name = name
  }

  static validate(name: string): boolean{
    if(!name || name.trim().length < 2 || name.trim().length > 255){
      return false
    }

    return true
  }

  static create(name: string): Either<InvalidCreditCardNameError, Name>{
    if(!this.validate(name)){
      return left(new InvalidCreditCardNameError(name))
    }

    return right(new Name(name))
  }
}
