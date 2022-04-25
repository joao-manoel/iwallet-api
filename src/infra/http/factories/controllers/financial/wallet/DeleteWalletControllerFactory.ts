import { Controller } from "@core/infra/Controller";
import { PrismaWalletsRepository } from '@modules/Financial/repositories/prisma/PrismaWalletsRepository';
import { DeleteWallet } from "@modules/Financial/useCases/Wallet/DeleteWallet/DeleteWallet";
import { DeleteWalletController } from "@modules/Financial/useCases/Wallet/DeleteWallet/DeleteWalletController";

export function makeDeleteWalletController(): Controller {
  const prismaWalletRepository = new PrismaWalletsRepository()
  const deleteWallet = new DeleteWallet(prismaWalletRepository)
  const deleteWalletController = new DeleteWalletController(deleteWallet)

  return deleteWalletController
}
