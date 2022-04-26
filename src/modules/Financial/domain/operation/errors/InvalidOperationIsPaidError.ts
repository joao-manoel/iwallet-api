import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidOperationIsPaidError extends Error implements DomainError {
  constructor(){
    super(`The is paid is invalid.`)
    this.name = 'InvalidOperationIsPaidError'
  }
}
