import { Operation } from "../domain/operation/operation"

export interface IOperationsRepository {
  create(operation: Operation): Promise<void>
  delete(id: string): Promise<void>
  save(operation: Operation): Promise<void>
  findById(id: string): Promise<Operation>
}
