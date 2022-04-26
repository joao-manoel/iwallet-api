import { Controller } from "@core/infra/Controller";
import { clientError, conflict, fail, HttpResponse, notFound } from "@core/infra/HttpResponse";
import { InvalidCategoryNameError } from "@modules/Financial/domain/category/errors/InvalidCategoryNameError";
import { InvalidCategoryTransactionTypeError } from "@modules/Financial/domain/category/errors/InvalidCategoryTransactionTypeError";
import { InvalidNotFoundCategoryError } from "./errors/InvalidNotFoundCategoryError";
import { UpdateCategory } from "./UpdateCategory";

type UpdateCategoryControllerRequest = {
  id: string
  userId: string
  data: {
    name?: string
    type?: string
  }
}

export class UpdateCategoryController implements Controller{

  constructor(private updateCategory: UpdateCategory){}

  async handle({id, userId, data}: UpdateCategoryControllerRequest): Promise<HttpResponse>{
    try {


      const result = await this.updateCategory.execute({
        id,
        userId,
        data
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case InvalidNotFoundCategoryError:
            return notFound(error)
          case InvalidCategoryNameError:
          case InvalidCategoryTransactionTypeError:
            return conflict(error)
          default:
            return clientError(error)
        }
      }

    } catch (error) {
      return fail(error)
    }
  }

}
