import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accountRoutes.js'
import {promises as fs} from 'fs';
import cors from 'cors';
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