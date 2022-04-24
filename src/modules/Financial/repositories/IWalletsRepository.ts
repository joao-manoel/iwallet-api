import { Wallet } from './../domain/wallet/wallet';

export interface IWalletsRepository {
  create(wallet: Wallet): Promise<void>
  delete(id: string): Promise<void>
  save(wallet: Wallet): Promise<void>
  findById(id: string): Promise<Wallet>
  findByNameWithUser(name: string, user_id: string): Promise<Wallet>
  findByIdWithUser(id: string, user_id: string): Promise<Wallet>
}
