import express, { Request, Response } from 'express';
import { orderModel } from '../models/orders';
import verifyAuth from '../services/verifyAuth';

const order = new orderModel;

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await order.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const selectOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const orders = await order.selectOrdersByUserId(req.params.user_id as unknown as number);
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const orders = await order.show(req.params.id as unknown as number);
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => { 
    try {
        const newOrder = await order.create(req.body);
        res.json(newOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await order.update(req.body);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orders = await order.delete(req.params.id as unknown as number);
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', verifyAuth.verifyAuthToken, index);
    //using verifyUserToken to check if the sended token in request is belong to the user 
    //that sends the request to get his orders data
    app.get('/ordersUser/:user_id', verifyAuth.verifyUserToken, selectOrdersByUserId);
    app.get('/orders/:id', verifyAuth.verifyAuthToken, show);
    app.post('/orders', verifyAuth.verifyAuthToken, create);
    app.put('/orders', verifyAuth.verifyAuthToken, update);
    app.delete('/orders/:id', verifyAuth.verifyAuthToken, deleteOrder);
}

export default order_routes;
