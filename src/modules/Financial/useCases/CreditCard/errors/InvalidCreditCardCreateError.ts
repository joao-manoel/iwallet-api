import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidCreditCardCreateError extends Error implements UseCaseError {
  constructor() {
    super(`Unable to create credit card, please try again later.`)
    this.name = 'InvalidCreditCardCreateError'
  }
}
