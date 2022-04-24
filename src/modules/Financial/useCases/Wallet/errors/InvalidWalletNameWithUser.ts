import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidWalletNameWithUser extends Error implements UseCaseError {
  constructor(name: string) {
    super(`There is already a wallet with that ${name} for this user.`)
    this.name = 'InvalidWalletNameWithUser'
  }
}
