import { prisma } from "@infra/prisma/client";
import { Operation } from "@modules/Financial/domain/operation/operation";
import { OperationMapper } from "@modules/Financial/mappers/OperationMapper";
import { IOperationsRepository } from "../IOperationsRepository";

export class PrismaOperationsRepository implements IOperationsRepository{
  async create(operation: Operation): Promise<void> {
    const data = OperationMapper.toPersistence(operation)

    await prisma.operation.create({
      data,
    })
  }
  async delete(id: string): Promise<void> {
    await prisma.operation.delete({
      where: {
        id
      }
    })
  }

  async save(operation: Operation): Promise<void> {
    const data = OperationMapper.toPersistence(operation)

    await prisma.operation.update({
      where: {
        id: operation.id
      },
      data
    })
  }

  async findById(id: string): Promise<Operation> {
    const operation = await prisma.operation.findUnique({
      where: {
        id
      }
    })

    if(!operation) return null

    return OperationMapper.toDomain(operation)
  }

}
