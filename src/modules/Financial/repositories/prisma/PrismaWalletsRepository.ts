import { WalletMapper } from './../../mappers/WalletMapper';
import { prisma } from '@infra/prisma/client';

import { Wallet } from './../../domain/wallet/wallet';
import { IWalletRepository } from './../IWalletsRepository';

export class PrismaWalletsRepository implements IWalletRepository{
  async create(wallet: Wallet): Promise<void>{
    const data = WalletMapper.toPersistence(wallet)

    await prisma.wallet.create({
      data,
    })

  }
}
