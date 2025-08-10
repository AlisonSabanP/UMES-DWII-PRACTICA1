import { Router } from 'express';
import { 
    getWorkersHandler, 
    postWorkerHandler, 
    putWorkerHandler,
    deleteWorkerHandler
} from '../controllers/workers.controller.js';

const router = Router();

router.get('/', getWorkersHandler);
router.post('/', postWorkerHandler);
router.put('/:id', putWorkerHandler);
router.delete('/:id', deleteWorkerHandler)

export default router;