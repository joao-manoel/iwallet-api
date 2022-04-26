import { Controller } from "@core/infra/Controller"
import { clientError, fail, HttpResponse, notFound, unauthorized } from "@core/infra/HttpResponse"
import { DeleteCategory } from "./DeleteCategory"
import { InvalidNotFoundCategoryError } from "./errors/InvalidNotFoundCategoryError"
import { InvalidUnauthorizedDeleteCategoryError } from "./errors/InvalidUnauthorizedDeleteCategoryError"

type DeleteCategoryControllerRequest = {
  id: string
  userId: string
}

export class DeleteCategoryController implements Controller {

  constructor(private deleteCategory: DeleteCategory){}

  async handle({id, userId}: DeleteCategoryControllerRequest): Promise<HttpResponse>{
    try {

      const result = await this.deleteCategory.execute({
        id,
        userId
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case InvalidNotFoundCategoryError:
            return notFound(error)
          case InvalidUnauthorizedDeleteCategoryError:
            return unauthorized(error)
          default:
            return clientError(error)
        }
      }

    } catch (error) {
      return fail(error)
    }
  }

}
