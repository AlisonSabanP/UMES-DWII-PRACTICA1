import { Router } from 'express';
import clientsRoute from './clients.route.js';
import productRoute from './products.routes.js';
import supplierRout from './suppliers.route.js';

const router = Router();

router.use("/clients", clientsRoute);
router.use("/products", productRoute);
router.use("/suppliers", supplierRout);

export default router;
