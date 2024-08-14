import { DayJsProvider } from '@/providers/day-js-provider'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const dayJsProvider = DayJsProvider.getInstance()
  const checkInsRepository = new PrismaCheckInsRepository(dayJsProvider)
  const validateCheckInUseCase = new ValidateCheckInUseCase(
    checkInsRepository,
    dayJsProvider,
  )

  return validateCheckInUseCase
}
