import { InMemoryGymsRepository } from '@/repositories/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase
describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: 17.7135315,
      longitude: -48.1224845,
    })

    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -19.933259,
      longitude: -43.9628026,
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -19.933259,
      userLongitude: -43.9628026,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
