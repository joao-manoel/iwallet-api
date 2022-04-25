import { Controller } from "@core/infra/Controller"
import { PrismaWalletsRepository } from "@modules/Financial/repositories/prisma/PrismaWalletsRepository"
import { UpdateWallet } from "@modules/Financial/useCases/Wallet/UpdateWallet/UpdateWallet"
import { UpdateWalletController } from "@modules/Financial/useCases/Wallet/UpdateWallet/UpdateWalletController"

export function makeUpdateWalletController() : Controller {
  const prismaWalletRepository = new PrismaWalletsRepository()
  const updateWallet = new UpdateWallet(prismaWalletRepository)
  const updateWalletController= new UpdateWalletController(updateWallet)

  return updateWalletController

}
