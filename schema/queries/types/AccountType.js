import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat } from "graphql";

const Account = new GraphQLObjectType({
    name: "AccountType",
    fields: () => ({
        id: {
            type: GraphQLInt 
        },
        name: {
            type: GraphQLString
        },
        balance: {
            type: GraphQLFloat
        }
    }) 
})

export default Account;