import { Controller } from "@core/infra/Controller";
import { clientError, conflict, created, fail, HttpResponse, notFound } from "@core/infra/HttpResponse";
import { InvalidCurrencyError } from "@modules/Financial/domain/wallet/errors/InvalidCurrencyError";
import { InvalidWalletNameError } from "@modules/Financial/domain/wallet/errors/InvalidWalletNameError";
import { InvalidNotFoundWalletError } from "../errors/InvalidNotFoundWalletError";
import { UpdateWallet } from "./UpdateWallet";

type UpdateWalletControllerRequest = {
  id: string,
  userId: string,
  data: {
    name?: string
    currency?: string
  }
}

export class UpdateWalletController implements Controller {

  constructor(private updateWallet: UpdateWallet){}

  async handle({id, userId, data}: UpdateWalletControllerRequest): Promise<HttpResponse>{
    try{
      const result = await this.updateWallet.execute({
        id,
        userId,
        data
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case InvalidNotFoundWalletError:
            notFound(error)
          case InvalidCurrencyError:
            return conflict(error)
          case InvalidWalletNameError:
            return conflict(error)
          default:
            clientError(error)
        }
      }else {
        return created()
      }
    }catch(err){
      return fail(err)
    }
  }

}
