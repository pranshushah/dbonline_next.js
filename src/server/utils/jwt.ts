import { sign, verify, JwtPayload, decode } from 'jsonwebtoken';
import { JwtRefreshUser, JwtAccessUser } from '../types';
import { NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { GetPrismaClient } from './GetPrismaClient';
import { ServerResponse } from 'http';

export class JWT {
  static createAccessAndRefreshToken(
    user: JwtRefreshUser,
    res: NextApiResponse,
  ) {
    const accessToken = sign(
      { email: user.email, id: user.id, name: user.name },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: '1m',
        subject: user.id,
      },
    );
    const refreshToken = sign(
      {
        email: user.email,
        id: user.id,
        name: user.name,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: '1000 days',
        subject: user.id,
      },
    );
    res.setHeader('Set-Cookie', [
      serialize(process.env.JWT_REFRESH_COKKIE_NAME!, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      }),
      serialize(process.env.JWT_ACCESS_COKKIE_NAME!, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      }),
    ]);
  }
  static async verifyRefreshToken(
    token: string,
  ): Promise<JwtPayload | JwtRefreshUser | null> {
    if (token !== '') {
      try {
        const payload = verify(token, process.env.JWT_REFRESH_SECRET!) as
          | JwtPayload
          | JwtRefreshUser;
        const prisma = GetPrismaClient.getInstance();
        // checking the token version
        const user = await prisma.user.findFirst({
          where: { id: payload.id, tokenVersion: payload.tokenVersion },
        });
        if (user) {
          return payload;
        } else {
          return null;
        }
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }
  static verifyAccessToken(
    authToken: string,
    strict: boolean = true,
    ignoreExpiration = false,
  ) {
    if (authToken !== '') {
      try {
        // ! says it can not be undefined
        const payload = verify(authToken, process.env.JWT_ACCESS_SECRET!, {
          ignoreExpiration,
        });
        return payload as JwtAccessUser;
      } catch (e) {
        if (strict) {
          throw new Error(e);
        } else {
          return null;
        }
      }
    } else {
      if (strict) {
        throw new Error('you are not authorized');
      } else {
        return null;
      }
    }
  }
  static removeBothCookies(res: ServerResponse) {
    res.setHeader('Set-Cookie', [
      serialize(process.env.JWT_REFRESH_COKKIE_NAME!, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: -1,
      }),
      serialize(process.env.JWT_ACCESS_COKKIE_NAME!, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: -1,
      }),
    ]);
  }
  static async createNewAccessTokenAndRefreshTokenFromRefreshToken(
    oldRefreshToken: string,
    res: ServerResponse | NextApiResponse,
  ) {
    const payload = await JWT.verifyRefreshToken(oldRefreshToken);
    if (payload) {
      // we already verified the token version and it's all ok.
      const prisma = GetPrismaClient.getInstance();
      const { googleId, photo, ...updatedUser } = await prisma.user.update({
        where: { id: payload.id },
        data: { tokenVersion: { increment: 1 } },
      });
      JWT.createAccessAndRefreshToken(updatedUser, res as NextApiResponse);
    } else {
      throw new Error('somthing went wrong while creating new access token');
    }
  }
}
