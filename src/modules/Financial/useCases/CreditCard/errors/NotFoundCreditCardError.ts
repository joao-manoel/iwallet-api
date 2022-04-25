import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class NotFoundCreditCardError extends Error implements UseCaseError {
  constructor() {
    super(`Credit card not found.`)
    this.name = 'NotFoundCreditCardError'
  }
}
