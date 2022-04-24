import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidCreditCardLimitError extends Error implements DomainError {
  constructor(){
    super(`The limit is invalid.`)
    this.name = 'InvalidCreditCardLimitError'
  }
}
