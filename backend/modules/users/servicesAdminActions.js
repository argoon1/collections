import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function deleteUsers(req, res) {
  const toDeleteUsersEmails = req.body;
  try {
    for (const email of toDeleteUsersEmails) {
      await prisma.user.delete({
        where: {
          email,
        },
      });
    }
    res.sendStats(204);
  } catch (e) {}
}
async function blockUsers(req, res) {
  const toBlockUsersEmails = req.body;
  try {
    for (const email of toBlockUsersEmails) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          blocked: true,
        },
      });
    }
    res.sendStats(204);
  } catch (e) {}
}
async function unblockUsers(req, res) {
  const toBlockUsersEmails = req.body;
  try {
    for (const email of toBlockUsersEmails) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          blocked: false,
        },
      });
    }
    res.sendStats(204);
  } catch (e) {}
}

export { deleteUsers, blockUsers, unblockUsers };
