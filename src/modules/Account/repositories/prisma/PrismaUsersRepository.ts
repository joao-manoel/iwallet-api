import { prisma } from '@infra/prisma/client';

import { User } from './../../domain/user/user';
import { UserMapper } from './../../mappers/UserMapper';
import { IUsersRepository } from './../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository{

  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: {email}
    })

    return !!userExists
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        id,
        deleted_at: null
      }
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.create({ data })
  }

}
