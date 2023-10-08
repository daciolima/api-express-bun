import { GraphQLSchema, GraphQLObjectType } from "graphql";
import accountQueries from "./queries/accountQuery.js";
import accountMutation from "./mutations/accountMutation.js";

const schemaAccount = new GraphQLSchema({
    types: null,
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            ...accountQueries
        }
    }),
    mutation: new GraphQLObjectType({
        name: "RootMutationType",
        fields: {
            ...accountMutation
        }
    })
})

export default schemaAccount;