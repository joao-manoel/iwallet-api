import { InvalidCurrencyError } from './errors/InvalidCurrencyError';
import { InvalidAccountFinancialNameError } from './errors/InvalidAccountFinancialNameError';
import { Either, right } from '@core/logic/Either';
import { Entity } from '@core/domain/Entity';
import { Name } from './name';
import { Currency } from './currency';

interface IAccountProps {
  name: Name
  currency: Currency
}

export class Account extends Entity<IAccountProps>{
  get name() {
    return this.props.name
  }

  get currency() {
    return this.props.currency
  }

  private constructor(props: IAccountProps, id?: string){
    super(props, id)
  }

  static create(props: IAccountProps, id?: string): Either<
    InvalidAccountFinancialNameError |
    InvalidCurrencyError,
    Account
  > {
    const account = new Account(props, id)

    return right(account)
  }
}
