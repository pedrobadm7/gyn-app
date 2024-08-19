import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanDatabase() {
  try {
    // Exemplo: Remover o banco de dados e recriá-lo
    await prisma.$executeRaw`DROP DATABASE IF EXISTS mydb`
    await prisma.$executeRaw`CREATE DATABASE mydb`
    console.log('Database cleaned successfully.')
  } catch (error) {
    console.error('Error cleaning the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanDatabase()
