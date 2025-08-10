import { Router } from 'express';
import clientsRoute from './clients.route.js';
import productRoute from './products.routes.js';

const router = Router();

router.use("/clients", clientsRoute);
router.use("/product", productRoute)
export default router;
