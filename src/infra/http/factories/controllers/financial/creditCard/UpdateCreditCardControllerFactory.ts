import { Controller } from "@core/infra/Controller";
import { PrismaCreditCardRepository } from "@modules/Financial/repositories/prisma/PrismaCreditCardRepository";
import { UpdateCreditCard } from "@modules/Financial/useCases/CreditCard/UpdateCreditCard/UpdateCreditCard";
import { UpdateCreditCardController } from "@modules/Financial/useCases/CreditCard/UpdateCreditCard/UpdateCreditCardController";

export function makeUpdateCreditCardController(): Controller {
  const prismaCreditCardRepository = new PrismaCreditCardRepository
  const updateCreditCard = new UpdateCreditCard(prismaCreditCardRepository)
  const updateCreditCardController = new UpdateCreditCardController(updateCreditCard)

  return updateCreditCardController
}
