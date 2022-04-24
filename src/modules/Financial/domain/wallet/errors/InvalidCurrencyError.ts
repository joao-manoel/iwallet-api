import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidCurrencyError extends Error implements DomainError {
  constructor(){
    super(`The currency type must be one of usd our brl`)
    this.name = 'InvalidCurrencyError'
  }
}
