import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: InMemoryGymsRepository
let searchGymUseCase: SearchGymUseCase
describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymUseCase = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for a gym', async () => {
    await gymsRepository.create({
      title: 'BH Fitness',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await searchGymUseCase.execute({
      query: 'BH Fitness',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'BH Fitness' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Fox Fit - ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      query: 'Fox Fit',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Fox Fit - 21' }),
      expect.objectContaining({ title: 'Fox Fit - 22' }),
    ])
  })
})
