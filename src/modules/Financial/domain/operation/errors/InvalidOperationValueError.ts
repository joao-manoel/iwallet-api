import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidOperationValueError extends Error implements DomainError {
  constructor(){
    super(`The value is invalid.`)
    this.name = 'InvalidOperationValueError'
  }
}
