import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidWalletWithUserError extends Error implements UseCaseError {
  constructor() {
    super(`No wallet found for this user.`)
    this.name = 'InvalidWalletWithUserError'
  }
}
