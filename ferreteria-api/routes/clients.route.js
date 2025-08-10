import { Router } from 'express';
import { 
    getClientsHandler, 
    postClientHandler, 
    putClientHandler,
    deleteClientHandler
} from '../controllers/clients.controller.js';

const router = Router();

router.get('/', getClientsHandler);
router.post('/', postClientHandler);
router.put('/:id', putClientHandler);
router.delete('/:id', deleteClientHandler)

export default router;