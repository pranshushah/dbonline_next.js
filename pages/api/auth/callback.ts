import passport from 'passport';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from '../../../src/server/utils/jwt';
import { UserFromPassport } from '../../../src/server/types';
import { RedirectAfterLogin } from '../../../src/server/utils/RedirectUrlAfterLogin';

interface Request extends NextApiRequest {
  user: UserFromPassport;
}
const handler = nextConnect<Request, NextApiResponse>();

handler.get(
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    JWT.CREATE_REFRESH_TOKEN(req.user, res);
    JWT.CREATE_ACCESS_TOKEN(req.user, res);
    res.redirect(`/${RedirectAfterLogin.url}`);
  },
);

export default handler;
