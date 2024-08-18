import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'

import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    const existingSchemas = await prisma.$queryRawUnsafe<string[]>(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schema}'`,
    )

    if (existingSchemas.length > 0) {
      throw new Error(
        `Schema ${schema} already exists. Please retry with a different UUID.`,
      )
    }

    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
