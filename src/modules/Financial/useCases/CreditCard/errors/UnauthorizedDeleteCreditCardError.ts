import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class UnauthorizedDeleteCreditCardError extends Error implements UseCaseError {
  constructor() {
    super(`Unauthorized delete credit card.`)
    this.name = 'UnauthorizedDeleteCreditCardError'
  }
}
