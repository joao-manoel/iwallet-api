import { Category } from "@modules/Financial/domain/category/category";
import { ICategorysRepository } from "../ICategorysRepository";

export class PrismaCategorysRepository implements ICategorysRepository{
  create(wallet: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(wallet: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }

}
