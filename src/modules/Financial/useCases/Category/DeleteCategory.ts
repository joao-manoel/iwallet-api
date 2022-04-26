import { Either, left, right } from "@core/logic/Either";
import { ICategorysRepository } from "@modules/Financial/repositories/ICategorysRepository";
import { InvalidNotFoundCategoryError } from "./errors/InvalidNotFoundCategoryError";
import { InvalidUnauthorizedDeleteCategoryError } from "./errors/InvalidUnauthorizedDeleteCategoryError";

type DeleteCategoryRequest = {
  id: string
  userId: string
}

type DeleteCategoryReponse = Either<InvalidNotFoundCategoryError | InvalidUnauthorizedDeleteCategoryError, null>

export class DeleteCategory {
  constructor(private categorysRepository: ICategorysRepository){}

  async execute({id, userId}: DeleteCategoryRequest): Promise<DeleteCategoryReponse>{
    const category = await this.categorysRepository.findById(id)

    if(!category){
      return left(new InvalidNotFoundCategoryError())
    }

    if(category.userId !== userId){
      return left(new InvalidUnauthorizedDeleteCategoryError())
    }

    return right(null)
  }
}
