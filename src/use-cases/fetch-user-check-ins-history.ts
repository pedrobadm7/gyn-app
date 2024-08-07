import { CheckInsRepoository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchMemberCheckInsHistoryUseCaseParams {
  userId: string
  page: number
}

interface FetchMemberCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepoository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsHistoryUseCaseParams): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}
