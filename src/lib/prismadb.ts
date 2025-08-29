import { PrismaClient } from '@prisma/client'

const PrismaClientSingleton = () => {
  return new PrismaClient()
}

// Prevent multiple instances of Prisma Client in development
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

declare const globalThis: {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  prismaGlobal: ReturnType<typeof PrismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
