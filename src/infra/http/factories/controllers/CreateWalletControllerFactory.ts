import { Controller } from '@core/infra/Controller';
import { PrismaWalletsRepository } from '@modules/Financial/repositories/prisma/PrismaWalletsRepository';
import { CreateWalletController } from '@modules/Financial/useCases/CreateWallet/CreateAccountController';
import { CreateWallet } from '@modules/Financial/useCases/CreateWallet/CreateWallet';

export function makeCreateWalletController() : Controller {
  const prismaWalletRepository = new PrismaWalletsRepository()
  const createWallet = new CreateWallet(prismaWalletRepository)
  const createWalletController= new CreateWalletController(createWallet)

  return createWalletController

}
