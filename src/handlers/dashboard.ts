import express, { Request, Response } from 'express';
import { dashboard } from '../services/dashboard';
import verifyAuth from '../services/verifyAuth';

const dashboardService = new dashboard;

const userOrders = async (_req: Request, res: Response) => {
    try {
        const userOrders = await dashboardService.userOrders();
        res.json(userOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const topOrderedProducts = async (req: Request, res: Response) => {
    try {
        const topProducts = await dashboardService.topOrderedProducts();
        res.json(topProducts);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const dashboard_routes = (app: express.Application) => {
    app.get('/usersOrders', verifyAuth.verifyAuthToken, userOrders);
    app.get('/topOrderedProducts', verifyAuth.verifyAuthToken, topOrderedProducts);
}

export default dashboard_routes;
