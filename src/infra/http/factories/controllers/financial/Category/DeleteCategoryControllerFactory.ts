import { Controller } from "@core/infra/Controller"
import { PrismaCategorysRepository } from "@modules/Financial/repositories/prisma/PrismaCategorysRepository"
import { DeleteCategory } from "@modules/Financial/useCases/Category/DeleteCategory"
import { DeleteCategoryController } from "@modules/Financial/useCases/Category/DeleteCategoryController"

export function makeDeleteCategoryController(): Controller {
  const prismaCategorysRepository = new PrismaCategorysRepository()

  const deleteCategory = new DeleteCategory(prismaCategorysRepository)
  const deleteCategoryController = new DeleteCategoryController(deleteCategory)

  return deleteCategoryController
}
