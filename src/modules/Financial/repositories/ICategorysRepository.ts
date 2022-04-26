import { Category } from "../domain/category/category"

export interface ICategorysRepository {
  create(wallet: Category): Promise<void>
  delete(id: string): Promise<void>
  save(wallet: Category): Promise<void>
  findById(id: string): Promise<Category>
  findByName(name: string): Promise<Category>
}
