import { CreateWallet } from './CreateWallet';

import { Controller } from '@core/infra/Controller';
import { HttpResponse, created, clientError, fail } from '@core/infra/HttpResponse';

type CreateWalletControllerRequest = {
  name: string
  userId: string
}

export class CreateWalletController implements Controller {

  constructor(private createWallet: CreateWallet){}

  async handle({name, userId}: CreateWalletControllerRequest): Promise<HttpResponse>{

    try{
      const result = await this.createWallet.execute({
        name: 'super',
        currency: 'BRL',
        userId,
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          default: clientError(error)
        }
      } else{
        return created()
      }
    }catch(err){
      return fail(err)
    }

  }

}
