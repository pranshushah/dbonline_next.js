import { JWT } from './jwt';
import { decode, JwtPayload } from 'jsonwebtoken';
import { parse } from 'cookie';
import { ServerResponse, IncomingMessage } from 'http';

export async function checkAuthAndIfTokenIsexpiredGiveNewOne(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.headers.cookie) {
    const cookieObj = parse(req.headers.cookie);
    const accessToken = cookieObj[process.env.JWT_ACCESS_COKKIE_NAME];
    const refreshToken = cookieObj[process.env.JWT_REFRESH_COKKIE_NAME];
    if (accessToken) {
      try {
        const { exp }: JwtPayload = decode(accessToken) as JwtPayload;
        const payload = JWT.verifyAccessToken(accessToken, false, true);
        if (Date.now() >= exp * 1000) {
          if (payload) {
            //access token was perfect but it was expired, so we will create new Refresh token and access token
            await JWT.createNewAccessTokenAndRefreshTokenFromRefreshToken(
              refreshToken,
              res,
            );
            return true;
          } else {
            // somthing was wrong with token other than exp date so we will delete the cookie.
            JWT.removeBothCookies(res);
            return false;
          }
        } else {
          // token was perfect so we check if user wants go to the home page from dashboard or database if it is we let them do that.
          return true;
        }
      } catch (e) {
        JWT.removeBothCookies(res);
        return false;
      }
    } else {
      JWT.removeBothCookies(res);
      return false;
    }
  } else {
    return false;
  }
}
