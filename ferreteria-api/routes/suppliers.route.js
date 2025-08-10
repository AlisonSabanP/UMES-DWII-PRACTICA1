import { Router } from 'express';
import { 
    getSuppliersHandler, 
    postSupplierHandler, 
    putSupplierHandler,
    deleteSupplierHandler
} from '../controllers/suppliers.controller.js';

const router = Router();

router.get('/', getSuppliersHandler);
router.post('/', postSupplierHandler);
router.put('/:id', putSupplierHandler);
router.delete('/:id', deleteSupplierHandler)

export default router;