import { IncomingMessage } from 'http';
import { parse } from 'cookie';
import { JWT } from './jwt';
export function getUser(req: IncomingMessage) {
  const cookieObj = parse(req.headers.cookie);
  const accessToken = cookieObj[process.env.JWT_ACCESS_COKKIE_NAME];
  const user = JWT.verifyAccessToken(accessToken);
  return user;
  try {
  } catch (e) {
    throw new Error('not logged in');
  }
}
