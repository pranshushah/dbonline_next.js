import { list, mutationField, nonNull } from 'nexus';
import { getUser } from '../../utils/getUser';

export const CreateDatabases = mutationField('CreateDatabases', {
  type: 'Boolean',
  args: { data: nonNull(list('addDatabase')) },
  resolve: async (_, { data }, { prisma, req }) => {
    try {
      const user = getUser(req);
      const mappedData = data.map((dataPoint) => ({
        ...dataPoint,
        authorId: user.id,
      }));
      await prisma.databaseInfo.createMany({ data: mappedData });
      return true;
    } catch (e) {
      return false;
    }
  },
});

export const CreateDatabase = mutationField('CreateDatabase', {
  type: 'Database',
  args: { data: nonNull('addDatabase') },
  resolve: async (_, { data }, { prisma, req }) => {
    try {
      const user = getUser(req);
      const mappedData = { ...data, authorId: user.id };
      const database = await prisma.databaseInfo.create({ data: mappedData });
      return {
        ...database,
        createdAt: database.createdAt.toDateString(),
        modifiedAt: database.modifiedAt.toDateString(),
      };
    } catch (e) {
      throw new Error('Something went wrong while creating database');
    }
  },
});
