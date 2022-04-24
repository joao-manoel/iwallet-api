import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidCreditCardBrandError extends Error implements DomainError {
  constructor(){
    super(`The brand is invalid.`)
    this.name = 'InvalidCreditCardBrandNameError'
  }
}
