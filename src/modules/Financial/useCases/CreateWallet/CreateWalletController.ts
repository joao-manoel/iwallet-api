import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  created,
  clientError,
  fail,
  conflict,
  notFound } from '@core/infra/HttpResponse';

import { InvalidUserError } from './errors/InvalidUserError';
import { InvalidWalletNameWithUser } from './errors/InvalidWalletNameWithUser';
import { ValidCurrencyTypes } from './../../domain/wallet/currency';
import { CreateWallet } from './CreateWallet';


type CreateWalletControllerRequest = {
  name: string
  currency: string
  userId: string
}

export class CreateWalletController implements Controller {

  constructor(private createWallet: CreateWallet){}

  async handle({name, currency, userId}: CreateWalletControllerRequest): Promise<HttpResponse>{

    try{

      const currencyTypesMap: Record<string, ValidCurrencyTypes> = {
        BRL: 'BRL',
        USD: 'USD'
      }

      const currencyType = currencyTypesMap[currency]


      const result = await this.createWallet.execute({
        name,
        currency: currencyType,
        userId,
      })

      if(result.isLeft()){
        const error = result.value

        switch(error.constructor){
          case InvalidUserError:
            return notFound(error)
          case InvalidWalletNameWithUser:
            return conflict(error)
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
