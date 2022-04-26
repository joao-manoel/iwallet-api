import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidNotFoundCategoryError extends Error implements UseCaseError {
  constructor() {
    super(`Category not found.`)
    this.name = 'InvalidNotFoundCategoryError'
  }
}
