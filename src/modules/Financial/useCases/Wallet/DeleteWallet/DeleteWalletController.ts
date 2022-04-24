import { Controller } from "@core/infra/Controller";
import { clientError, fail, HttpResponse, notFound, ok, unauthorized } from "@core/infra/HttpResponse";

import { DeleteWallet } from './DeleteWallet';
import { NotFoundWalletDeleteError } from "./errors/NotFoundWalletDeleteError";
import { UnauthorizedDeleteWalletError } from './errors/UnauthorizedDeleteWalletError';

type DeleteWalletControllerRequest = {
  userId: string
  id: string
}

export class DeleteWalletController implements Controller {

  constructor(private deleteWallet: DeleteWallet){}

  async handle({userId, id}: DeleteWalletControllerRequest): Promise<HttpResponse>{
    try {
      const result = await this.deleteWallet.execute({
        id,
        userId
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case NotFoundWalletDeleteError:
            return notFound(error)
          case UnauthorizedDeleteWalletError:
            return unauthorized(error)
          default:
            return clientError(error)
        }
      } else {
        return ok()
      }
    } catch(err){
      return fail(err)
    }
  }
}
