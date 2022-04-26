import { Controller } from "@core/infra/Controller";
import { CreateCategoryController } from '@modules/Financial/useCases/Category/CreateCategoryController';
import { CreateCategory } from '@modules/Financial/useCases/Category/CreateCategory';
import { PrismaCategorysRepository } from "@modules/Financial/repositories/prisma/PrismaCategorysRepository";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUsersRepository";

export function makeCreateCategoryController(): Controller {
  const prismaCategorysRepository = new PrismaCategorysRepository()
  const prismaUsersRepository =  new PrismaUsersRepository()

  const createCategory = new CreateCategory(prismaCategorysRepository, prismaUsersRepository)
  const createCategoryController = new CreateCategoryController(createCategory)

  return createCategoryController
}
