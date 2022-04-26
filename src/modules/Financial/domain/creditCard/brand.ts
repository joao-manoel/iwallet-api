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
  private readonly brand: ValidBrandTypes

  get value(): ValidBrandTypes {
    return this.brand
  }

  private constructor(brand: ValidBrandTypes){
    this.brand = brand
  }

  static validate(brand: ValidBrandTypes): boolean{
    if(!validBrandTypes.includes(brand)) return false

    return true
  }

  static create(brand: ValidBrandTypes): Either<InvalidCreditCardBrandError, Brand>{
    if(!this.validate(brand)){
      return left(new InvalidCreditCardBrandError())
    }

    return right(new Brand(brand))
  }
}
