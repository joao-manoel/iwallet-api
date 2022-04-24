import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class UnauthorizedDeleteWalletError extends Error implements UseCaseError {
  constructor() {
    super(`Unauthorized delete wallet.`)
    this.name = 'UnauthorizedDeleteError'
  }
}
