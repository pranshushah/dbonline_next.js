import { enumType, nonNull, objectType } from 'nexus';
import { Database as DatabaseInfoType } from '../../types/backing';

interface allDatabaseInfo extends DatabaseInfoType {
  mainTableDetails: string;
  tableDndDetails: string;
}

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id', { description: 'id of the user' });
    t.nonNull.string('email', { description: 'email of the user' }),
      t.nonNull.string('name', { description: 'name of the user' }),
      t.nonNull.string('photo', { description: 'photo of the user' });
    t.nonNull.list.field('allDatabaseInfo', {
      type: nonNull('Database'),
      description: 'all the databases created by user',
      resolve: async (user, _, { prisma }) => {
        const databases = await prisma.databaseInfo.findMany({
          where: { id: user.id },
        });
        const updatedDatabase = databases.map((database) => {
          const newDatabase: allDatabaseInfo = {
            ...database,
            createdAt: database.createdAt.toDateString(),
            modifiedAt: database.modifiedAt.toDateString(),
            mainTableDetails: database.mainTableDetails.toString(),
            tableDndDetails: database.tableDndDetails.toString(),
          };
          return newDatabase;
        });
        return updatedDatabase;
      },
    });
  },
});

export const DatabaseType = enumType({
  name: 'DatabaseType',
  members: ['oracle', 'postgresql', 'mysql'],
  description: 'types of database are supported',
});

export const Database = objectType({
  name: 'Database',
  definition(t) {
    t.nonNull.id('id', { description: 'id of the user' });
    t.nonNull.string('databaseName');
    t.nonNull.field('databaseType', { type: 'DatabaseType' });
    t.nonNull.string('mainTableDetails', {
      resolve(database) {
        // mainTableDetails will have json type we will convert them into the string.
        return database.mainTableDetails.toString();
      },
    });
    t.nonNull.string('tableDndDetails', {
      resolve(database) {
        // tableDndDetails will have json type we will convert them into the string.
        return database.tableDndDetails.toString();
      },
    });
    t.nonNull.string('createdAt');
    t.nonNull.string('modifiedAt');
    t.string('originalAuthorId');
    t.nonNull.string('authorId');
    t.nonNull.int('views');
    t.nonNull.int('numberOfForks');
    t.field('originalAuthor', {
      type: 'User',
      description: 'details of the original database creator',
      resolve: async (database, _, { prisma }) => {
        const user = await prisma.user.findFirst({
          where: { id: database.originalAuthorId },
        });
        return user;
      },
    });
    t.nonNull.field('author', {
      type: nonNull('User'),
      description: 'details of the  database creator',
      resolve: async (database, _, { prisma }) => {
        const user = await prisma.user.findFirst({
          where: { id: database.authorId },
        });
        return user;
      },
    });
  },
});
