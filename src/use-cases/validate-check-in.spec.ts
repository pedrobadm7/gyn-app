import { DayJsProvider } from '@/providers/day-js-provider'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase
let dayJsProvider: DayJsProvider

const TWENTY_ONE_MINUTS_IN_MS = 1000 * 60 * 21

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    dayJsProvider = DayJsProvider.getInstance()
    validateCheckInUseCase = new ValidateCheckInUseCase(
      checkInsRepository,
      dayJsProvider,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate inexistent check in', async () => {
    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 6, 7, 14, 8))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    vi.advanceTimersByTime(TWENTY_ONE_MINUTS_IN_MS)

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
