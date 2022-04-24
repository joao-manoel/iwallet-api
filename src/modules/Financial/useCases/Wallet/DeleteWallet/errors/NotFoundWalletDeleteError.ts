import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class NotFoundWalletDeleteError extends Error implements UseCaseError {
  constructor() {
    super(`Wallet not found.`)
    this.name = 'NotFoundWalletDeleteError'
  }
}
