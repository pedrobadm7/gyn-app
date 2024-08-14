import { DayJsProvider } from '@/providers/day-js-provider'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const dayJsProvider = DayJsProvider.getInstance()
  const prismaCheckInsRepository = new PrismaCheckInsRepository(dayJsProvider)
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    prismaCheckInsRepository,
  )

  return fetchUserCheckInsHistoryUseCase
}
