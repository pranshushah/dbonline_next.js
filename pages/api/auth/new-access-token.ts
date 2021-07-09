import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from '../../../src/server/utils/jwt';
const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const token = req.cookies[process.env.JWT_REFRESH_COKKIE_NAME!];
  try {
    await JWT.createNewAccessTokenAndRefreshTokenFromRefreshToken(token, res);
    res.status(200).send({ ok: true });
  } catch (e) {
    res.status(401).send({ ok: false, message: 'token is invalid' });
  }
});

export default handler;
