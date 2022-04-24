import { Either, left, right } from "@core/logic/Either"
import { IUsersRepository } from "@modules/Account/repositories/IUsersRepository"
import { Currency } from "@modules/Financial/domain/wallet/currency"
import { InvalidCurrencyError } from "@modules/Financial/domain/wallet/errors/InvalidCurrencyError"
import { InvalidWalletNameError } from "@modules/Financial/domain/wallet/errors/InvalidWalletNameError"
import { Name } from "@modules/Financial/domain/wallet/name"
import { IWalletsRepository } from "@modules/Financial/repositories/IWalletsRepository"
import { currencyTypesMap } from "../CreateWallet/CreateWalletController"
import { InvalidWalletError } from "../errors/InvalidWalletError"

type UpdateWalletRequest = {
  id: string,
  userId: string,
  data: {
    name?: string
    currency?: string
  }
}

type UpdateWalletResponse = Either<
  | InvalidWalletError
  | InvalidCurrencyError
  | InvalidWalletNameError
, null>

export class UpdateWallet{
  constructor(
    private walletsRepository: IWalletsRepository
  ){}

  async execute({id, userId, data}: UpdateWalletRequest): Promise<UpdateWalletResponse>{

    if(data.name || data.currency){
      const wallet = await this.walletsRepository.findByIdWithUser(id, userId)


      if(!wallet){
        return left(new InvalidWalletError())
      }

      if(data.currency){
        const currencyType = currencyTypesMap[data.currency]
        const currencyOrError = Currency.create(currencyType)

        if(currencyOrError.isLeft()){
          return left(new InvalidCurrencyError())
        }

        wallet.currency = currencyOrError.value
      }

      if(data.name){
        const nameOrError = Name.create(data.name)

        if(nameOrError.isLeft()){
          return left(new InvalidWalletNameError(data.name))
        }

        wallet.name = nameOrError.value
      }

      await this.walletsRepository.save(wallet)
    }

    return right(null)
  }
}
