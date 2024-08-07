import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserpProfileUseCase = new GetUserProfileUseCase(
    prismaUsersRepository,
  )

  return getUserpProfileUseCase
}
