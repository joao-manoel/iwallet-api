import { WalletMapper } from './../../mappers/WalletMapper';
import { prisma } from '@infra/prisma/client';

import { Wallet } from './../../domain/wallet/wallet';
import { IWalletsRepository } from './../IWalletsRepository';

export class PrismaWalletsRepository implements IWalletsRepository{
  async create(wallet: Wallet): Promise<void>{
    const data = WalletMapper.toPersistence(wallet)

    await prisma.wallet.create({
      data,
    })

  }

  async findByNameWithUser(name: string, user_id: string) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        name,
        user_id
      }
    })

    if (!wallet) {
      return null
    }

    return WalletMapper.toDomain(wallet)
  }

  async delete(id: string){

  }
}
