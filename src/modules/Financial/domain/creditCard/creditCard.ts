import { Entity } from "@core/domain/Entity";
import { Either, right } from "@core/logic/Either";

import { Name } from "./name"
import { Limit } from './limit';
import { Brand } from "./brand";
import { InvalidCreditCardNameError } from "./errors/InvalidCreditCardNameError";
import { InvalidCreditCardLimitError } from './errors/InvalidCreditCardLimitError';
import { InvalidCreditCardBrandError } from './errors/InvalidCreditCardBrandError';

interface ICreditCardProps {
  name: Name
  limit: Limit
  brand: Brand
  userId: string
  walletId: string
}

export class CreditCard extends Entity<ICreditCardProps>{

  private constructor(props: ICreditCardProps, id?: string){
    super(props, id)
  }

  get name(){
    return this.props.name
  }

  get limit(){
    return this.props.limit
  }

  get brand(){
    return this.props.brand
  }

  get userId(){
    return this.props.userId
  }

  get walletId(){
    return this.props.walletId
  }

  set name(name: Name){
    this.props.name = name
  }

  set limit(limit: Limit){
    this.props.limit = limit
  }

  set brand(brand: Brand){
    this.props.brand = brand
  }

  static create(props: ICreditCardProps, id?: string): Either<
    | InvalidCreditCardNameError
    | InvalidCreditCardLimitError
    | InvalidCreditCardBrandError,
  CreditCard> {
    const creditCard = new CreditCard(props, id)

    return right(creditCard)
  }


}
