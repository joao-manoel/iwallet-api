import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidAlreadyCategoryNameError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`This name '${name}' is already in use`)
    this.name = 'InvalidAlreadyCategoryNameError'
  }
}
