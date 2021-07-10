import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';
import nextConnect from 'next-connect';
import { RedirectAfterLogin } from '../../../src/server/utils/RedirectUrlAfterLogin';
import { GetPrismaClient } from '../../../src/server/utils/GetPrismaClient';

const GoogleStrategy = GooglePassport.Strategy;
const handler = nextConnect();

//callbackfunction for GoogleStrategy
async function googleDetailsCallback(
  accessToken: string,
  refreshToken: string,
  { id, displayName: name, _json: { email }, photos }: GooglePassport.Profile,
  done: GooglePassport.VerifyCallback,
) {
  try {
    const prisma = GetPrismaClient.getInstance();
    const user = await prisma.user.findFirst({
      where: { googleId: id },
    });
    if (user) {
      // user is logged in so we will just upgrade the tokenVersion so it will invalidate the previous refresh tokens.
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          tokenVersion: {
            increment: 1,
          },
        },
      });
      done(null, {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        tokenVersion: updatedUser.tokenVersion,
        isSignup: false,
      });
    } else {
      const { googleId, photo, ...newUser } = await prisma.user.create({
        data: {
          googleId: id,
          name,
          photo: photos ? photos[0].value : null,
          email,
        },
      });
      done(null, { ...newUser, isSignup: true });
    }
  } catch {
    throw new Error('somthing went wrong while getting profile');
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID!,
      clientSecret: process.env.clientSecret!,
      callbackURL: '/api/auth/callback',
    },
    googleDetailsCallback,
  ),
);

handler.get(
  passport.initialize(),
  (req, _, next) => {
    if (req.query['redirect']) {
      RedirectAfterLogin.url = req.query['redirect'] as string;
    }
    next();
  },
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

export default handler;
