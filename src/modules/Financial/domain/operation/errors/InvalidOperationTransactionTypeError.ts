import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidOperationTransactionTypeError extends Error implements DomainError {
  constructor(){
    super(`The transaction type must be one of creditcard, deposit, fixedExpense our variableExpense.`)
    this.name = 'InvalidOperationTransactionTypeError'
  }
}
