import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidWalletCreateError extends Error implements UseCaseError {
  constructor() {
    super(`Unable to create wallet, please try again later.`)
    this.name = 'InvalidWalletCreateError'
  }
}
