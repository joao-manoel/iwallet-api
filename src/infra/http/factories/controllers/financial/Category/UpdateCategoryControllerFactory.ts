import { Controller } from "@core/infra/Controller";
import { PrismaCategorysRepository } from "@modules/Financial/repositories/prisma/PrismaCategorysRepository";
import { UpdateCategory } from "@modules/Financial/useCases/Category/UpdateCategory";
import { UpdateCategoryController } from "@modules/Financial/useCases/Category/UpdateCategoryController";

export function makeUpdateCategoryController(): Controller {
  const prismaCategorysRepository = new PrismaCategorysRepository()

  const updateCategory = new UpdateCategory(prismaCategorysRepository)
  const updateCategoryController = new UpdateCategoryController(updateCategory)

  return updateCategoryController
}
