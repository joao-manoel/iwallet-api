import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidCategoryCreateError extends Error implements UseCaseError {
  constructor() {
    super(`Oops, could not create category, try again later!`)
    this.name = 'InvalidCategoryCreateError'
  }
}
