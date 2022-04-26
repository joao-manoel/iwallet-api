import { Entity } from '@core/domain/Entity';
import { Either, right } from '@core/logic/Either';
import { InvalidOperationIsPaidError } from './errors/InvalidOperationIsPaidError';
import { InvalidOperationNameError } from './errors/InvalidOperationNameError';
import { InvalidOperationPaidAtError } from './errors/InvalidOperationPaidAtError';
import { InvalidOperationTransactionTypeError } from './errors/InvalidOperationTransactionTypeError';
import { InvalidOperationValueError } from './errors/InvalidOperationValueError';
import { isPaid } from './isPaid';
import { Name } from "./name";
import { PaidAt } from './paidAt';
import { Type } from "./type";
import { Value } from "./value";

interface IOperationProps {
  name: Name
  value: Value
  type: Type
  isPaid: isPaid
  paidAt: PaidAt
  userId: string
  walletId: string
  categoryId: string
  creditCardId: string
}

export class Operation extends Entity<IOperationProps>{

  private constructor(props: IOperationProps, id?: string){
    super(props, id)
  }

  static create(props: IOperationProps, id?: string): Either<
    | InvalidOperationIsPaidError
    | InvalidOperationNameError
    | InvalidOperationPaidAtError
    | InvalidOperationTransactionTypeError
    | InvalidOperationValueError,
    Operation
  > {
    const operation = new Operation(props, id)

    return right(operation)
  }

  get name(){
    return this.props.name
  }

  get value(){
    return this.props.value
  }

  get type(){
    return this.props.type
  }

  get isPaid(){
    return this.props.isPaid
  }

  get paidAt(){
    return this.props.paidAt
  }

  get userId(){
    return this.props.userId
  }

  get walletId(){
    return this.props.walletId
  }

  get categoryId(){
    return this.categoryId
  }

  set name(name: Name){
    this.props.name = name
  }

  set value(price: Value){
    this.props.value = price
  }

  set type(type: Type){
    this.props.type = type
  }

  set isPaid(isPaid: isPaid){
    this.props.isPaid = isPaid
  }

  set paidAt(paidAt: PaidAt){
    this.props.paidAt = paidAt
  }

  set userId(id: string){
    this.props.userId = id
  }

  set walletId(id: string){
    this.props.walletId = id
  }

}
