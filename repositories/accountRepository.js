import {promises as fs} from 'fs'

const {readFile, writeFile} = fs;


async function getAccounts(){

    const data = JSON.parse(await readFile("accounts.json"))

    delete data.nextId

    return data.accounts;
}

async function getOneAccount(id) {
    const accounts = await getAccounts();

    const account = accounts.find(account => account.id === id)
    if(!account) {
        throw new Error("Registro não encontrado");
    }
    return account
}

async function insertAccount(account) {

    const data = JSON.parse(await readFile("accounts.json"))

    account = {
        id: data.nextId++, 
        name: account.name,
        balance: account.balance
    }

    data.accounts.push(account)
    
    await writeFile("accounts.json", JSON.stringify(data, null, 2));

    return account;
}

async function putAccount(account) {
    
    const data = JSON.parse(await readFile("accounts.json"))
        
    const index = data.accounts.findIndex(a => a.id === account.id);

    if(index === -1) {
        throw new Error("Registro não encontrado");
    }

    data.accounts[index] = account;
    
    await writeFile("accounts.json", JSON.stringify(data, null, 2))

    return data.accounts[index]
}

async function patchAccount(account) {
    
    const data = JSON.parse(await readFile("accounts.json"))
        
    const index = data.accounts.findIndex(a => a.id === account.id);

    if(index === -1) {
        throw new Error("Registro não encontrado");
    }

    data.accounts[index].balance = account.balance;
    
    await writeFile("accounts.json", JSON.stringify(data, null, 2))

    return data.accounts[index]

}


async function deleteAccount(id) {

    const data = JSON.parse(await readFile("accounts.json"))

    const index = data.accounts.find(a => a.id === id);

    if(index === -1) {
        return false
    }
        
    data.accounts = data.accounts.filter(account => account.id !== parseInt(id))
    
    await writeFile("accounts.json", JSON.stringify(data, null, 2))

    return true
}







export default {getAccounts, insertAccount, getOneAccount, putAccount, patchAccount, deleteAccount}