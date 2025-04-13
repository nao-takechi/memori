import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const alice = await prisma.user.create({
  //   data: {
  //     UID: "Alice",
  //     diaries: {
  //       create: {
  //         message: "Check out Prisma",
  //       },
  //     },
  //   },
  // });
  // console.log({ alice });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
