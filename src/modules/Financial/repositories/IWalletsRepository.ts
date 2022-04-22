import { Wallet } from './../domain/wallet/wallet';

export interface IWalletsRepository {
  create(wallet: Wallet): Promise<void>
  findByNameWithUser(name: string, user_id: string): Promise<Wallet>
}
