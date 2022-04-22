import { InvalidWalletNameError } from './errors/InvalidWalletNameError';
import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';

import { Name } from './name';
import { Currency } from './currency';

import { InvalidCurrencyError } from './errors/InvalidCurrencyError';

interface IWalletProps {
  name: Name
  currency: Currency
  userId: string
}

export class Wallet extends Entity<IWalletProps>{
  get name() {
    return this.props.name
  }

  get currency() {
    return this.props.currency
  }

  get userId() {
    return this.props.userId
  }

  private constructor(props: IWalletProps, id?: string){
    super(props, id)
  }

  static create(props: IWalletProps, id?: string): Either<
    InvalidWalletNameError |
    InvalidCurrencyError,
    Wallet
  > {
    const wallet = new Wallet(props, id)

    return right(wallet)
  }
}
