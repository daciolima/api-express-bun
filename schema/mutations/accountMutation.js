import { GraphQLBoolean, GraphQLInt } from "graphql";
import Account from "../queries/types/AccountType.js";
import AccountInput from "../queries/types/AccountInputType.js";
import accountResolver from "../resolvers/accountResolver.js";

const accountMutation = {
    createAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput 
            } 
        },
        resolve(_, args) {
            return accountResolver.createAccount(args.account)
        }

    },
    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve(_, args) { 
            return accountResolver.deleteAccount(args.id)
        }
    },
    updateAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) { 
            return  accountResolver.putAccount(args.account)
        }
    }
}

export default accountMutation;