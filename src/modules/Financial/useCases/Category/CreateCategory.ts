import { Either, left, right } from "@core/logic/Either";
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository";
import { Type, ValidTransactionType } from "@modules/Financial/domain/category/type";
import { InvalidCategoryTransactionTypeError } from '@modules/Financial/domain/category/errors/InvalidCategoryTransactionTypeError';
import { InvalidUserError } from "@modules/Account/domain/user/errors/InvalidUserError";
import { ICategorysRepository } from "@modules/Financial/repositories/ICategorysRepository";
import { Name } from "@modules/Financial/domain/category/name";
import { Category } from "@modules/Financial/domain/category/category";
import { InvalidCategoryNameError } from './../../domain/category/errors/InvalidCategoryNameError';
import { InvalidCategoryCreateError } from "./errors/InvalidCategoryCreateError";
import { InvalidAlreadyCategoryNameError } from "./errors/InvalidAlreadyCategoryNameError";


type CreateCategoryRequest = {
  name: string
  type: ValidTransactionType
  userId: string
}

type CreateCategoryResponse = Either<
  | InvalidUserError
  | InvalidCategoryNameError
  | InvalidCategoryTransactionTypeError
  | InvalidAlreadyCategoryNameError
  | InvalidCategoryCreateError
, Category>

export class CreateCategory{
  constructor(
    private categorsRepository: ICategorysRepository,
    private usersRepository: IUsersRepository
    ){}

  async execute({name, type, userId}: CreateCategoryRequest): Promise<CreateCategoryResponse>{
    const nameOrError = Name.create(name)
    const typeOrError = Type.create(type)


    const userExists = await this.usersRepository.findById(userId)

    if(!userExists){
      return left(new InvalidUserError())
    }

    if(nameOrError.isLeft()){
      return left(new InvalidCategoryNameError(name))
    }

    if(typeOrError.isLeft()){
      return left(new InvalidCategoryTransactionTypeError())
    }

    const AlreadyCategoryName = await this.categorsRepository.findByName(name)

    if(AlreadyCategoryName){
      return left(new InvalidAlreadyCategoryNameError(name))
    }

    const categoryOrError = Category.create({
      name: nameOrError.value,
      type: typeOrError.value,
      userId
    })

    if(categoryOrError.isLeft()){
      return left(new InvalidCategoryCreateError())
    }

    const category = categoryOrError.value

    await this.categorsRepository.create(category)

    return right(category)
  }
}
