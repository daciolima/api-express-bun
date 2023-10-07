import {promises as fs} from 'fs'
import accountService from '../services/accountService.js';

const {readFile, writeFile} = fs;



async function createAccount(req, res, next) {
    try {
        let account = req.body;

        if(!account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatório.")
        }

        await accountService.createAccount(account)

        res.status(201)
        .json({
            status: 'success',
            data: [account],
            message: `Conta criada com sucesso.`
        })
    
    global.logger.info(`POST /account - ${JSON.stringify(account)}`)  
        
    } catch(err) {
        next(err)
    }    
}


async function getAllAccount(_, res, next) {
    try {
        // const data = JSON.parse(await readFile("accounts.json"));
        
        res.send(await accountService.getAllAccount())

        global.logger.info("GET /account")

    } catch(err) {
        next(err)
    }
}

async function getOneAccount(req, res, next) { 
    try {
        
        const account = await accountService.getOneAccount(parseInt(req.params.id))

        res.send(account)

        global.logger.info(`GET /account/id - ${JSON.stringify(account)}`)

    } catch (err) {
        next(err)
    }
}

async function putAccount(req, res, next) { 

     try {
        const account = req.body;

        if(!account.id  || !account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatório.")
        }

        const data = await accountService.putAccount(account)

        res.send(data)

        global.logger.info(`PUT /account/id - ${JSON.stringify(data)}`)

        
    } catch (err) {
        next(err)
    } 


}

async function patchAccount(req, res, next) { 
    try {
        const account = req.body;

        if(!account.id || account.balance === null) {
            throw new Error("ID e balance são obrigatório.");
        }

        const data = await accountService.patchAccount(account)

        res.send(data)

        global.logger.info(`PATCH /account/id - ${JSON.stringify(account)}`)

        
    } catch (err) {
        next(err)
    }
}

async function deleteAccount(req, res, next) { 
    try {

        const retorno = await accountService.deleteAccount(req.params.id)

        if(!retorno) {
            res.status(404).send({error: "Conta não encontrada."})
        }
        
        res.status(204).send()

        global.logger.info(`DELETE /account/id - ${req.params.id}`)

    } catch (err) {
        next(err)
    }
}


export default {createAccount, getAllAccount, getOneAccount, putAccount, patchAccount, deleteAccount};