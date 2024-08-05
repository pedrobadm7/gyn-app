import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepoository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
