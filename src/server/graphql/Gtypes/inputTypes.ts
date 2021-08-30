import { inputObjectType } from 'nexus';

export const addDatabase = inputObjectType({
  name: 'addDatabase',
  definition(t) {
    t.nonNull.string('id', {
      description:
        'id of database. if this field is not present we will id by ourselves',
    });
    t.nonNull.list.string('tables', { description: 'number of tables in ' });
    t.nonNull.string('databaseName', { description: 'name of the database' });
    t.nonNull.field('databaseType', { type: 'DatabaseType' });
    t.nonNull.string('createdAt', {
      description: 'date of database when it was created in string form',
    });
    t.nonNull.string('modifiedAt', {
      description: 'date of database when it was last modified in string form',
    });
    t.nonNull.string('mainTableDetails', {
      description: 'details of the all tables in string form',
    });
    t.nonNull.string('tableDndDetails', {
      description: 'cordinates,colour of tables in string form ',
    });
  },
});
