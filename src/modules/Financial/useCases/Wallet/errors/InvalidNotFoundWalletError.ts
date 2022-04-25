import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidNotFoundWalletError extends Error implements UseCaseError {
  constructor() {
    super(`Wallet not found.`)
    this.name = 'InvalidNotFoundWalletError'
  }
}
