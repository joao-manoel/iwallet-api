import { prisma } from "@infra/prisma/client";
import { Category } from "@modules/Financial/domain/category/category";
import { CategoryMapper } from "@modules/Financial/mappers/CategoryMapper";
import { ICategorysRepository } from "../ICategorysRepository";

export class PrismaCategorysRepository implements ICategorysRepository{
  async create(category: Category): Promise<void> {
    const data = CategoryMapper.toPersistence(category)

    await prisma.category.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id
      }
    })
  }

  async save(category: Category): Promise<void> {
    const data = CategoryMapper.toPersistence(category)

    await prisma.category.update({
      where: {
        id: category.id
      },
      data
    })
  }

  async findById(id: string): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: {
        id
      }
    })

    if(!category) return null

    return CategoryMapper.toDomain(category)
  }

  async findByName(name: string): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    })

    if(!category) return null

    return CategoryMapper.toDomain(category)
  }

}
