import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  let usersRepository: InMemoryUsersRepository
  let registerUseCase: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@mail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '12345',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
