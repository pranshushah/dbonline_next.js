import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { JwtAccessUser, JwtRefreshUser } from '../types';
import { NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { GetPrismaClient } from './GetPrismaClient';

export class JWT {
  static CREATE_ACCESS_TOKEN(user: JwtAccessUser, res: NextApiResponse) {
    const accessToken = sign(
      { email: user.email, id: user.id, name: user.name },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: '3m',
        subject: user.id,
      },
    );
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.JWT_ACCESS_COKKIE_NAME!, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      }),
    );
  }
  static CREATE_REFRESH_TOKEN(user: JwtRefreshUser, res: NextApiResponse) {
    const refreshToken = sign(
      {
        email: user.email,
        id: user.id,
        name: user.name,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: '100 days',
        subject: user.id,
      },
    );
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.JWT_REFRESH_COKKIE_NAME!, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      }),
    );
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
  static verifyAccessToken(authToken: string, strict: boolean = true) {
    if (authToken !== '') {
      try {
        // bearer {token}
        const token = authToken.split(' ')[1];
        // ! says it can not be undefined
        const payload = verify(token, process.env.JWT_ACCESS_SECRET!);
        return payload as JwtPayload | JwtAccessUser;
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
}
