import { CheckInsRepoository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseParams {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepoository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseParams): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
