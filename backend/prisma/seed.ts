import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function seedUserRoles() {
  const roles = [
    { id: 1, role: 'root'},
    { id: 2, role: 'admin'},
    { id: 3, role: 'co-admin'},
    { id: 4, role: 'manager'},
    { id: 5, role: 'member'},
  ];

  for (const role of roles) {
    await prisma.userrole.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  }
}

async function rootSociety() {
   await prisma.society.upsert({
    where: {id:0},
    update: {},
    create: {
      id: 0,
      name: "Global",
      address: "Global Society"
    }
   })
}

async function rootUser() {
  const rootPass = process.env.ROOT_USER_PWD || "rootuserpass";
  const hashedPassword = await bcrypt.hash(rootPass, 10);

  await prisma.user.upsert({
    where:{
      email: 'superu@sangh.com'
    },
    update: {},
    create: {
      email: 'superu@sangh.com',
      societyId: 0,
      phoneNumber: 999999999,
      firstName: 'Root',
      password: hashedPassword,
      role: 1,
    }
  })
}


async function main() {
  // seed user roles
  await seedUserRoles();

  //seed root society
  await rootSociety();

  // seed root user
  await rootUser();
}

main()
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
