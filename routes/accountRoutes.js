import express from 'express';
import cors from 'cors';

import AccountController from '../controllers/accountController.js';


const router = express.Router();

const corsOptions = {
    origin: 'http://localhost:3001'
}

router.post('/', cors(corsOptions), AccountController.createAccount)

router.get('/', AccountController.getAllAccount)

router.get('/:id', AccountController.getOneAccount)

router.put('/', AccountController.putAccount)

router.patch('/', AccountController.patchAccount)

router.delete('/:id', AccountController.deleteAccount)


router.use((err, req, res, next) => {
    global.logger.error(`${req.method} - ${req.baseUrl} - ${err.message}`)
    res.status(400).send({error: err.message})
})


export default router;