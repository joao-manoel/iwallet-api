import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidAlreadyUsedNameError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`There is already a credit card with that ${name} for this user.`)
    this.name = 'InvalidAlreadyUsedNameError'
  }
}
