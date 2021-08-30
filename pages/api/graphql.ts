import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../src/server/schema';
import { GetPrismaClient } from '../../src/server/utils/GetPrismaClient';

const prisma = GetPrismaClient.getInstance();

const apolloGraphqlServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, prisma }),
});

const handler = apolloGraphqlServer.createHandler({ path: '/api/graphql' });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
