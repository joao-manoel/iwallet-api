import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidOperationPaidAtError extends Error implements DomainError {
  constructor(){
    super(`The date is invalid.`)
    this.name = 'InvalidOperationPaidAtError'
  }
}
