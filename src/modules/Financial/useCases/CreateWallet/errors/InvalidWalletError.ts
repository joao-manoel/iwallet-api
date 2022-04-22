import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidWalletError extends Error implements UseCaseError {
  constructor() {
    super(`Wallet data is invalid.`)
    this.name = 'InvalidWalletError'
  }
}
