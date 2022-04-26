import { InvalidCategoryTransactionTypeError } from './errors/InvalidCategoryTransactionTypeError';
import { InvalidCategoryNameError } from './errors/InvalidCategoryNameError';
import { Entity } from '@core/domain/Entity';

import { Name } from './name';
import { Type } from './type';
import { Either, right } from '@core/logic/Either';

interface ICategoryProps {
  name: Name
  type: Type
}

export class Category extends Entity<ICategoryProps> {
  private constructor(props: ICategoryProps, id?: string){
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
  }

  set name(name: Name) {
    this.props.name = name
  }

  set type(type: Type) {
    this.props.type = type
  }

  static create(props: ICategoryProps, id?: string): Either<
    | InvalidCategoryNameError
    | InvalidCategoryTransactionTypeError,
    Category
  > {
    const category = new Category(props, id)

    return right(category)
  }
}
