import { DateProvider } from '@/providers/date-provider'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const dayJsProvider = DateProvider.getInstance()
  const prismaCheckInsRepository = new PrismaCheckInsRepository(dayJsProvider)
  const gymsRepository = new PrismaGymsRepository()

  const checkInUseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    gymsRepository,
  )

  return checkInUseCase
}
