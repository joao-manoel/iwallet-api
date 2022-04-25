import { Controller } from "@core/infra/Controller";
import { PrismaCreditCardRepository } from "@modules/Financial/repositories/prisma/PrismaCreditCardRepository";
import { DeleteCreditCard } from "@modules/Financial/useCases/CreditCard/DeleteCreditCard/DeleteCreditCard";
import { DeleteCreditCardController } from "@modules/Financial/useCases/CreditCard/DeleteCreditCard/DeleteCreditCardController";

export function makeDeleteCreditCardController(): Controller {
  const prismaCreditCardRepository = new PrismaCreditCardRepository
  const deleteCreditCard = new DeleteCreditCard(prismaCreditCardRepository)
  const deleteCreditCardController = new DeleteCreditCardController(deleteCreditCard)

  return deleteCreditCardController
}
