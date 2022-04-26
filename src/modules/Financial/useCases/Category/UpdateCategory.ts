import { validTransactionTypesMap } from './CreateCategoryController';
import { InvalidNotFoundCategoryError } from './errors/InvalidNotFoundCategoryError';
import { Either, Left, left, right } from "@core/logic/Either"
import { ICategorysRepository } from "@modules/Financial/repositories/ICategorysRepository"
import { Name } from '@modules/Financial/domain/category/name';
import { InvalidCategoryNameError } from '@modules/Financial/domain/category/errors/InvalidCategoryNameError';
import { Type } from '@modules/Financial/domain/category/type';
import { InvalidCategoryTransactionTypeError } from '@modules/Financial/domain/category/errors/InvalidCategoryTransactionTypeError';

type UpdateCategoryRequest = {
  id: string
  userId: string
  data: {
    name?: string
    type?: string
  }
}

type UpdateCategoryResponse = Either<
  | InvalidNotFoundCategoryError
  | InvalidCategoryNameError
  | InvalidCategoryTransactionTypeError
, null>

export class UpdateCategory{
  constructor(private categorysRespository: ICategorysRepository){}

  async execute({id, userId, data}: UpdateCategoryRequest): Promise<UpdateCategoryResponse>{

    const category = await this.categorysRespository.findById(id)

    if(!category){
      return left(new InvalidNotFoundCategoryError())
    }

    if(data.name){
      const nameOrError = Name.create(data.name)

      if(nameOrError.isLeft()){
        return left(new InvalidCategoryNameError(data.name))
      }

      category.name = nameOrError.value
    }

    if(data.type){
      const transactionType = validTransactionTypesMap[data.type]
      const typeOrError = Type.create(transactionType)

      if(typeOrError.isLeft()){
        return left(new InvalidCategoryTransactionTypeError())
      }

      category.type = typeOrError.value
    }

    await this.categorysRespository.save(category)

    return right(null)
  }
}
