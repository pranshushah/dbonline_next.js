import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from '../../../src/server/utils/jwt';
import { GetPrismaClient } from '../../../src/server/utils/GetPrismaClient';
const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const token = req.cookies[process.env.JWT_COKKIE_NAME!];
  const paylaod = await JWT.verifyRefreshToken(token);
  if (paylaod) {
    // we already verified the token version and it's all ok.
    const prisma = GetPrismaClient.getInstance();
    const { googleId, photo, ...updatedUser } = await prisma.user.update({
      where: { id: paylaod.id },
      data: { tokenVersion: { increment: 1 } },
    });
    JWT.CREATE_REFRESH_TOKEN(updatedUser, res);
    JWT.CREATE_ACCESS_TOKEN(updatedUser, res);
    res.status(200).send({ ok: true });
  } else {
    res.status(401).send({ ok: false, message: 'token is invalid' });
  }
});

export default handler;
