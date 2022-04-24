import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidWalletError extends Error implements UseCaseError {
  constructor() {
    super(`Wallet not found.`)
    this.name = 'InvalidWallet'
  }
}
