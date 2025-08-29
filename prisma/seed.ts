import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: 'Hello World',
    slug: 'hello-world',
    content: 'This is my first post!',
    published: true,
    author: {
      connectOrCreate: {
        where: { email: 'jhon@gmail.com' },
        create: { email: '  jhon@gmail.com', hashedPassword: 'hashedpassword' },
      },
    },
  },
]

async function main() {
  console.log('Start seeding ...')
  for (const postData of initialPosts) {
    const post = await prisma.post.create({
      data: postData,
    })
    console.log(`Created post with id: ${post.id}`)
  }
  console.log('Seeding finished.')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
