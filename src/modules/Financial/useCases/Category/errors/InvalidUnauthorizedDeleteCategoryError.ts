import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidUnauthorizedDeleteCategoryError extends Error implements UseCaseError {
  constructor() {
    super(`Unauthorized delete this category.`)
    this.name = 'InvalidUnauthorizedDeleteCategoryError'
  }
}
