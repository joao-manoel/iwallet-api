import { Category } from "../domain/category/category";
import { Category as PersistenceCategory } from '@prisma/client'
import { Name } from "../domain/category/name";
import { Type } from "../domain/category/type";

export class CategoryMapper {
  static toDomain(raw: PersistenceCategory): Category {
    const nameOrError = Name.create(raw.name)
    const typeOrError = Type.create(raw.type)

    if(nameOrError.isLeft()){
      throw new Error('Name value is invalid.')
    }

    if(typeOrError.isLeft()){
      throw new Error('Type value is invalid.')
    }

    const categoryOrError = Category.create(
      {
        name: nameOrError.value,
        type: typeOrError.value,
        userId: raw.user_id
      },
      raw.id
    )

    if(categoryOrError.isRight()){
      return categoryOrError.value
    }

    return null
  }

  static toPersistence(category: Category){
    return {
      id: category.id,
      name: category.name.value,
      type: category.type.value,
      user_id: category.userId
    }
  }
}
