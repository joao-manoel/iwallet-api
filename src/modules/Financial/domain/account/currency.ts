import { Either, left, right } from '@core/logic/Either';

import { InvalidCurrencyError } from './errors/InvalidCurrencyError';

export const validCurrencyTypes = [
  'USD',
  'BRL',
] as const

export type ValidCurrencyTypes = typeof validCurrencyTypes[number]

export class Currency {
  private readonly currency: ValidCurrencyTypes

  get value(): ValidCurrencyTypes {
    return this.currency
  }

  private constructor(currency: ValidCurrencyTypes){
    this.currency = currency
  }

  static validate(currency: ValidCurrencyTypes): boolean {
    if(!validCurrencyTypes.includes(currency)) return false

    return true
  }

  static create(currency: ValidCurrencyTypes): Either<InvalidCurrencyError, Currency>{
    if(!this.validate(currency)){
      return left(new InvalidCurrencyError(currency))
    }

    return right(new Currency(currency))
  }
}
