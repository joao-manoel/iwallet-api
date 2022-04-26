import { Controller } from "@core/infra/Controller";
import { clientError, conflict, created, fail, HttpResponse, unauthorized } from "@core/infra/HttpResponse";
import { InvalidUserError } from "@modules/Account/domain/user/errors/InvalidUserError";
import { InvalidCategoryNameError } from "@modules/Financial/domain/category/errors/InvalidCategoryNameError";
import { InvalidCategoryTransactionTypeError } from "@modules/Financial/domain/category/errors/InvalidCategoryTransactionTypeError";
import { ValidTransactionType } from "@modules/Financial/domain/operation/type";
import { CreateCategory } from "./CreateCategory";
import { InvalidAlreadyCategoryNameError } from "./errors/InvalidAlreadyCategoryNameError";
import { InvalidCategoryCreateError } from "./errors/InvalidCategoryCreateError";

type CreateCategoryControllerRequest = {
  name: string
  type: string
  userId: string
}

export const validTransactionTypesMap: Record<string, ValidTransactionType> = {
  CREDITCARD: 'CreditCard',
  DEPOSIT: 'Deposit',
  FIXEDEXPENSE: 'FixedExpense',
  VARIABLEEXPENSE:'VariableExpense'
}

export class CreateCategoryController implements Controller {

  constructor(private createCategory: CreateCategory){}

  async handle({name, type, userId}: CreateCategoryControllerRequest): Promise<HttpResponse>{
    try {


      const transactionType = validTransactionTypesMap[type.toUpperCase()]

      const result = await this.createCategory.execute({
        name,
        type: transactionType,
        userId
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case InvalidUserError:
            return unauthorized(error)
          case InvalidCategoryNameError:
          case InvalidCategoryTransactionTypeError:
          case InvalidAlreadyCategoryNameError:
          case InvalidCategoryCreateError:
            return conflict(error)
          default:
            return clientError(error)
        }
      }else {
        return created()
      }
    } catch (err) {
      return fail(err)
    }
  }
}
