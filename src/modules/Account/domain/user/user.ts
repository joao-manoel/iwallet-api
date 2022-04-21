import { Password } from './password';
import { Email } from './email';
import { Name } from './name';
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError';
import { InvalidEmailError } from './errors/InvalidEmailError';
import { Either, right } from './../../../../core/logic/Either';
import { Entity } from "@core/domain/Entity";
import { InvalidNameError } from './errors/InvalidNameError';

interface IUserProps {
  name: Name;
  email: Email;
  password: Password;
}

export class User extends Entity<IUserProps> {

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  private constructor(props: IUserProps, id?: string){
    super(props, id)
  }

  static create(
    props: IUserProps,
    id?: string): Either<
    InvalidNameError |
    InvalidEmailError |
    InvalidPasswordLengthError,
    User>{
    const user = new User(props, id)

    return right(user)
  }
}
