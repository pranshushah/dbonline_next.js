import * as allTypes from '../graphql';
import { join } from 'path';
import { makeSchema } from 'nexus';

export const schema = makeSchema({
  types: allTypes,
  //useful for creating types and don't save the types in dist folder.
  outputs: {
    schema: join(
      '/home/pranshu/projects/dbonline/src/server',
      'generated',
      'schema.graphql',
    ),
    typegen: join(
      '/home/pranshu/projects/dbonline/src/server',
      'generated',
      'nexus-typegen.ts',
    ),
  },
  contextType: {
    module: join(
      '/home/pranshu/projects/dbonline/src/server',
      'types',
      'backing.ts',
    ),
    export: 'ContextType',
  },
  sourceTypes: {
    /*types of parent of resolver for e.g.

    if want grab author in Post the type of parent will be
      {
        author: string;
        body: string;
        id: string;
        published: boolean;
        title: string;
      };
      not
      {
        author: User;
        body: string;
        id: string;
        published: boolean;
        title: string;
      };
    */
    modules: [
      {
        module: join(
          '/home/pranshu/projects/dbonline/src/server',
          'types',
          'backing.ts',
        ),
        alias: 'swapi',
      },
    ],
  },
});
