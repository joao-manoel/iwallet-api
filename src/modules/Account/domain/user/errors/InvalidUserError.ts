import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidUserError extends Error implements UseCaseError {
  constructor() {
    super(`User does not exists.`)
    this.name = 'InvalidUserError'
  }
}
