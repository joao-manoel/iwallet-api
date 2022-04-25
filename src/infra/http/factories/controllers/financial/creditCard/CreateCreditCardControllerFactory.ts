import { Controller } from '@core/infra/Controller';
import { PrismaUsersRepository } from '@modules/Account/repositories/prisma/PrismaUsersRepository';
import { PrismaCreditCardRepository } from '@modules/Financial/repositories/prisma/PrismaCreditCardRepository';
import { PrismaWalletsRepository } from '@modules/Financial/repositories/prisma/PrismaWalletsRepository';
import { CreateCreditCard } from '@modules/Financial/useCases/CreditCard/CreateCreditCard/CreateCreditCard';
import { CreateCreditCardController } from '@modules/Financial/useCases/CreditCard/CreateCreditCard/CreateCreditCardController';


export function makeCreateCreditCardController(): Controller {
  const prismaCreditCardRepository = new PrismaCreditCardRepository()
  const prismaWalletsRepository = new PrismaWalletsRepository()
  const prismaUserRepository = new PrismaUsersRepository()

  const createCreditCard = new CreateCreditCard(prismaCreditCardRepository, prismaWalletsRepository, prismaUserRepository)
  const createCreditCardController = new CreateCreditCardController(createCreditCard)

  return createCreditCardController
}
