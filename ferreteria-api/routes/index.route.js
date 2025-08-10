import { Router } from 'express';
import clientsRoute from './clients.route.js';

const router = Router();

router.use("/clients", clientsRoute);

export default router;
