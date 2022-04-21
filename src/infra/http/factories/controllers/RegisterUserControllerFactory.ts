import { CompareFieldsValidator } from '@infra/validation/CompareFieldsValidator';
import { Controller } from "@core/infra/Controller";
import { ValidatorCompositor } from "@infra/validation/Compositor";
import { PrismaUsersRepository } from "@modules/Account/repositories/prisma/PrismaUsersRepository";
import { RegisterUser } from '@modules/Account/useCases/RegisterUser';
import { RegisterUserController } from "@modules/Account/useCases/RegisterUserController";

export function makeRegisterUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUser = new RegisterUser(prismaUsersRepository)

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator('password', 'password_confirmation'),
  ])

  const registerUserController = new RegisterUserController(validator, registerUser)


  return registerUserController
}
