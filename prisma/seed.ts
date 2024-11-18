const { PrismaClient } = require('@prisma/client')
const  bcrypt  = require ('bcryptjs')

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password: await bcrypt.hash("password", 12),
      id: 1,
      role : "ADMIN",
      token : 12,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });