import { CreditCard } from './../domain/creditCard/creditCard';

export interface ICreditCardRepository {
  create(creditCard: CreditCard): Promise<void>
  delete(id: string): Promise<void>
  save(creditCard: CreditCard): Promise<void>
  findById(id: string): Promise<CreditCard>
  findByNameWithUser(name: string, user_id: string): Promise<CreditCard>
  findByIdWithUser(id: string, user_id: string): Promise<CreditCard>
}
