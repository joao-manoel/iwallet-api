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

  async save(wallet: Wallet): Promise<void> {
    const data = WalletMapper.toPersistence(wallet)

    await prisma.wallet.update({
      where: {
        id: wallet.id
      },
      data
    })
  }


  async delete(id: string): Promise<void>{
    await prisma.wallet.delete({
      where: {
        id
      }
    })
  }

  async findById(id: string): Promise<Wallet>{
    const wallet = await prisma.wallet.findUnique({
      where: {
        id
      }
    })

    if(!wallet) return null

    return WalletMapper.toDomain(wallet)
  }

  async findByNameWithUser(name: string, user_id: string): Promise<Wallet> {
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

  async findByIdWithUser(id: string, user_id: string): Promise<Wallet> {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id,
        user_id
      }
    })

    if (!wallet) {
      return null
    }

    return WalletMapper.toDomain(wallet)
  }
}
