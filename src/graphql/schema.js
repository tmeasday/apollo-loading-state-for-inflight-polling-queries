import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    echo: {
      type: GraphQLString,
      args: {
        delay: { type: GraphQLInt },
      },
      resolve: async (root, { delay }) => {
        return new Promise(r =>
          setTimeout(() => r(Math.random().toString()), delay)
        );
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
