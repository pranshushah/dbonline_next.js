import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../src/server/schema';

const apolloGraphqlServer = new ApolloServer({
  schema,
});

const handler = apolloGraphqlServer.createHandler({ path: '/api/graphql' });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
