import { Either, left, right } from "@core/logic/Either"
import { InvalidCreditCardBrandError } from "./errors/InvalidCreditCardBrandError"

export const validBrandTypes = [
  'AmericanExpress',
  'BNDES',
  'Dinners',
  'ELO',
  'HiperCard',
  'MasterCard',
  'Other',
  'SoroCard',
  'Visa',
] as const

export type ValidBrandTypes = typeof validBrandTypes[number]

export class Brand {
  private readonly type: ValidBrandTypes

  get value(): ValidBrandTypes {
    return this.type
  }

  private constructor(type: ValidBrandTypes){
    this.type = type
  }

  static validate(type: ValidBrandTypes): boolean{
    if(!validBrandTypes.includes(type)) return false

    return true
  }

  static create(type: ValidBrandTypes): Either<InvalidCreditCardBrandError, Brand>{
    if(!this.validate(type)){
      return left(new InvalidCreditCardBrandError())
    }

    return right(new Brand(type))
  }
}
