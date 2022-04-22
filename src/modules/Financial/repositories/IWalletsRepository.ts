import { Wallet } from './../domain/wallet/wallet';

export interface IWalletRepository {
  create(wallet: Wallet): Promise<void>
}
