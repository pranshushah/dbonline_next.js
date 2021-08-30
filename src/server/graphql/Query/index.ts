import { nonNull, queryField, stringArg } from 'nexus';

export const greetings = queryField('greeting', {
  type: nonNull('String'),
  args: {
    name: nonNull(stringArg({ default: 'pranshu' })),
  },
  resolve(_, { name }, { req }) {
    return `hello ${name}`;
  },
});
