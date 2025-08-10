import { Router } from 'express';
import clientsRoute from './clients.route.js';
import productRoute from './products.routes.js';
import supplierRoute from './suppliers.route.js';
import workerRoute from './workers.route.js';

const router = Router();

router.use("/clients", clientsRoute);
router.use("/products", productRoute);
router.use("/suppliers", supplierRoute);
router.use("/workers", workerRoute);

export default router;
    