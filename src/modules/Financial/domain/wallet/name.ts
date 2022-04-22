import { Either, left, right } from '@core/logic/Either';

import { InvalidWalletNameError } from './errors/InvalidWalletNameError';


export class Name {
  private readonly name: string

  get value(): string {
    return this.name
  }

  private constructor(name: string){
    this.name = name
  }

  static validate(name: string): boolean {
    if(!name || name.trim().length < 2 || name.trim().length > 255){
      return false
    }

    return true
  }

  static create(name: string): Either<InvalidWalletNameError, Name>{
    if(!this.validate(name)){
      return left(new InvalidWalletNameError(name))
    }

    return right(new Name(name))
  }
}
