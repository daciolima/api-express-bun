import { GraphQLInt, GraphQLList } from "graphql";
import Account from "./types/AccountType.js";
import accountResolver from "../resolvers/accountResolver.js";


const accountQueries = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => accountResolver.getAllAccount()
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => accountResolver.getOneAccount(args.id)
        
    }
}

export default accountQueries;