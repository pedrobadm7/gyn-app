import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

describe('Create Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let createGymsUseCase: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymsUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymsUseCase.execute({
      title: 'BH Fitness',
      description: null,
      phone: null,
      latitude: -19.933259,
      longitude: -43.9628026,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
