import { prisma } from '@infra/prisma/client';
import { CreditCard } from '@modules/Financial/domain/creditCard/creditCard';
import { CreditCardMapper } from '@modules/Financial/mappers/CreditCardMapper';

import { ICreditCardRepository } from './../ICreditCardRepository';

export class PrismaCreditCardRepository implements ICreditCardRepository{

  async create(creditCard: CreditCard): Promise<void> {
    const data = CreditCardMapper.toPersistence(creditCard)

    await prisma.creditCard.create({
     data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.creditCard.delete({
      where: {
        id
      }
    })
  }

  async save(creditCard: CreditCard): Promise<void> {
    const data = CreditCardMapper.toPersistence(creditCard)

    await prisma.creditCard.update({
      where: {
        id: creditCard.id
      },
      data
    })
  }

  async findById(id: string): Promise<CreditCard> {
    const creditCard = await prisma.creditCard.findUnique({
      where: {
        id
      }
    })

    if(!creditCard) return null

    return CreditCardMapper.toDomain(creditCard)
  }

  async findByNameWithUser(name: string, user_id: string): Promise<CreditCard> {
    const creditCard = await prisma.creditCard.findFirst({
      where: {
        name,
        user_id
      }
    })

    if(!creditCard) return null

    return CreditCardMapper.toDomain(creditCard)
  }

}
