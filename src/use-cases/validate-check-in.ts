import { DateProvider } from '@/providers/date-provider'
import { CheckInsRepoository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

const TWENTY_MINUTES = 20

export class ValidateCheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepoository,
    private dayJsProvider: DateProvider,
  ) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = this.dayJsProvider.diff(
      new Date(),
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > TWENTY_MINUTES) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
