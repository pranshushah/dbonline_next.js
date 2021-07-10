import { User } from '@prisma/client';

export type JwtAccessUser = Omit<User, 'googleId' | 'tokenVersion' | 'photo'>;
export type JwtRefreshUser = Omit<User, 'googleId' | 'photo'>;
export type UserFromPassport = Omit<User, 'googleId' | 'photo'>;
export interface UserFromPassportWithSignup extends UserFromPassport {
  isSignup: boolean;
}
