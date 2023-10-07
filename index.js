import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accountRoutes.js'
import {promises as fs} from 'fs';
import cors from 'cors';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import accountService from './services/accountService.js';
// import swaggerUi from 'swagger-ui-express';
// import {swaggerDocuments} from './docs.js'; 

// Destruct
const {readFile, writeFile} = fs;

// Logger
const {combine, timestamp, label, printf} = winston.format;
const format = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

global.logger = winston.createLogger({
    leval: "silly",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: "logger-bank-api.log"})
    ],
    format: combine(
        label({label: "logger-bank-api"}),
        timestamp(),
        format
    )
});


// Instanciando app
const app = express();


// Permitindo cominicação apenas via JSON
app.use(express.json());

// CORS. Aqui ele libera todos, porém setando cors() como parâmetro somente no endpoint libera apenas o referido endpoint.
app.use(cors());

// Documentação Swagger
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocuments));


// Setando entrada de route específica
app.use("/account", accountsRouter);

// Serve static
app.use(express.static("public"))


// Definindo schema GraphQL para um tipo e suas querys e mutations. Nesse caso para Account
// Type Account trata os Gets. Input InputAccount trata o Create, Update e Delete.
const schemaAccount = buildSchema(`
    type Account{ 
        id: Int
        name: String
        balance: Float
    }
    input InputAccount { 
        id: Int
        name: String
        balance: Float
    }
    type Query {
        getAccounts: [Account]
        getAccount(id: Int): Account
    }
    type Mutation {
        createAccount(account: InputAccount): Account 
        updateAccount(account: InputAccount): Account
        deleteAccount(id: Int): Boolean
    }
`)

const rootAccount = {
    getAccounts: () => accountService.getAllAccount(),
    getAccount(args){
        return accountService.getOneAccount(args.id)
    },
    createAccount({account}) {
        return accountService.createAccount(account)
    },
    updateAccount({account}) {
        return accountService.putAccount(account)
    },
    deleteAccount(args) {
        return accountService.deleteAccount(args.id)
    }     
}

// Definindo middleware para o GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schemaAccount, // Setar o Schema account
    rootValue: rootAccount, // Resolve da query. O que deve ser feito quando chegar requisição para o Schema.
    graphiql: true // Carregar a interface gráfica do GraphQL
}))


// Config server
app.listen(3000, async () => {
    
    try {
        await readFile("accounts.json");
        logger.info("It´s Server!")
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
            logger.info("It´s Server and File Created!")
        }).catch(err => {
            logger.error(err);
        })
    }

});