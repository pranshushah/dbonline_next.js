import passport from 'passport';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from '../../../src/server/utils/jwt';
import { UserFromPassportWithSignup } from '../../../src/server/types';
import { RedirectAfterLogin } from '../../../src/server/utils/RedirectUrlAfterLogin';

interface Request extends NextApiRequest {
  user: UserFromPassportWithSignup;
}
const handler = nextConnect<Request, NextApiResponse>();

handler.get(
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const { isSignup, ...user } = req.user;
    JWT.createAccessAndRefreshToken(user, res);
    res.redirect(`${RedirectAfterLogin.url}?signup=${isSignup}`);
  },
);

export default handler;
