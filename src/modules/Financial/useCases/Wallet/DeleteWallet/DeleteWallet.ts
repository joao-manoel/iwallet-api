import { Either, left, right } from "@core/logic/Either"
import { IWalletsRepository } from "@modules/Financial/repositories/IWalletsRepository"
import { NotFoundWalletDeleteError } from "./errors/NotFoundWalletDeleteError"

import { UnauthorizedDeleteWalletError } from './errors/UnauthorizedDeleteWalletError'



type DeleteWalletRequest = {
  id: string
  userId: string
}

type DeleteWalletResponse = Either<UnauthorizedDeleteWalletError | NotFoundWalletDeleteError, null>

export class DeleteWallet {
  constructor(private walletsRepository: IWalletsRepository){}

  async execute({id, userId}: DeleteWalletRequest): Promise<DeleteWalletResponse>{

    const wallet = await this.walletsRepository.findById(id)

    if(!wallet){
      return left(new NotFoundWalletDeleteError())
    }

    if(wallet.userId !== userId){
      return left(new UnauthorizedDeleteWalletError())
    }

    await this.walletsRepository.delete(id)

    return right(null)
  }
}
