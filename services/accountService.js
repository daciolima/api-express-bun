import accountRepository from '../repositories/accountRepository.js'


async function createAccount(account) {  
    
    return await accountRepository.insertAccount(account);
}

async function getAllAccount() {

    return await accountRepository.getAccounts();

}

async function getOneAccount(id) {

    return await accountRepository.getOneAccount(id)
}


async function putAccount(account) {

    return await accountRepository.putAccount(account)

}

async function patchAccount(account) {
    
    const acc = await accountRepository.getOneAccount(account.id);
    acc.balance = account.balance
    return await accountRepository.putAccount(acc)

}

async function deleteAccount(id) {
    
    return await accountRepository.deleteAccount(id)

}

export default { createAccount, getAllAccount, getOneAccount, putAccount, patchAccount, deleteAccount }