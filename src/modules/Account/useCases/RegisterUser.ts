import { Either, left, right } from '@core/logic/Either';

import { User } from './../domain/user/user';
import { Email } from './../domain/user/email';
import { Password } from './../domain/user/password';
import { Name } from '../domain/user/name';
import { InvalidPasswordLengthError } from './../domain/user/errors/InvalidPasswordLengthError';
import { InvalidEmailError } from './../domain/user/errors/InvalidEmailError';
import { InvalidNameError } from './../domain/user/errors/InvalidNameError';
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';
import { IUsersRepository } from './../repositories/IUsersRepository';

type RegisterUserResponse = Either<
  | AccountAlreadyExistsError
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordLengthError,
  User
>

export class RegisterUser {
  constructor(private usersRepository: IUsersRepository){}

 async execute({name, email, password}): Promise<RegisterUserResponse> {
  const nameOrError = Name.create(name)
  const emailOrError = Email.create(email)
  const passwordOrError = Password.create(password)

  if(nameOrError.isLeft()){
    return left(nameOrError.value)
  }

  if(emailOrError.isLeft()){
    return left(emailOrError.value)
  }

  if(passwordOrError.isLeft()){
    return left(passwordOrError.value)
  }

  const userOrError = User.create({
    name: nameOrError.value,
    email: emailOrError.value,
    password: passwordOrError.value
  })

  if(userOrError.isLeft()){
    return left(userOrError.value)
  }

  const user = userOrError.value

  const userAlreadyExists = await this.usersRepository.exists(user.email.value)


  if(userAlreadyExists){
    return left(new AccountAlreadyExistsError(user.email.value))
  }

  await this.usersRepository.create(user)

  return right(user)
 }
}
