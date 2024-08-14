import { DayJsProvider } from '@/providers/day-js-provider'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const dayJsProvider = DayJsProvider.getInstance()
  const prismaCheckInsRepository = new PrismaCheckInsRepository(dayJsProvider)
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaCheckInsRepository,
  )

  return getUserMetricsUseCase
}
