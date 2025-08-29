import prisma from './lib/prismadb'

async function main() {
  // prova: leggi i primi 10 utenti
  const users = await prisma.post.findMany({ take: 10 })
  console.log('Utenti trovati:', users)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
