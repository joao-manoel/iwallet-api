import { Controller } from '@core/infra/Controller';

import { PrismaUsersRepository } from '@modules/Account/repositories/prisma/PrismaUsersRepository';
import { PrismaWalletsRepository } from '@modules/Financial/repositories/prisma/PrismaWalletsRepository';
import { CreateWalletController } from '@modules/Financial/useCases/CreateWallet/CreateWalletController';
import { CreateWallet } from '@modules/Financial/useCases/CreateWallet/CreateWallet';

export function makeCreateWalletController() : Controller {
  const prismaWalletRepository = new PrismaWalletsRepository()
  const prismaUserRepository = new PrismaUsersRepository()
  const createWallet = new CreateWallet(prismaWalletRepository,prismaUserRepository)
  const createWalletController= new CreateWalletController(createWallet)

  return createWalletController

}
