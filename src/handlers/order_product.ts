import express, { Request, Response } from 'express';
import { orderProductsModel } from '../models/order_products';
import checkOrderStatus from '../services/checkOrderStatus';
import verifyAuth from '../services/verifyAuth';

const orderProduct_Model = new orderProductsModel;

const index = async (_req: Request, res: Response) => {
    try {
        const orderProducts = await orderProduct_Model.index();
        res.json(orderProducts);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const orderProducts = await orderProduct_Model.show(req.params.id as unknown as number);
        res.json(orderProducts);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => { 
    try {
        const newOrderProduct = await orderProduct_Model.create(req.body);
        res.json(newOrderProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedOrderProduct = await orderProduct_Model.update(req.body);
        res.json(updatedOrderProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deleteOrderProduct = async (req: Request, res: Response) => {
    try {
        const orderProduct = await orderProduct_Model.delete(req.params.id as unknown as number);
        res.json(orderProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const orders_products_routes = (app: express.Application) => {
    app.get('/orderProducts', verifyAuth.verifyAuthToken, index);
    app.get('/orderProducts/:id', verifyAuth.verifyAuthToken, show);
    app.post('/orderProducts', verifyAuth.verifyAuthToken, checkOrderStatus, create);
    app.put('/orderProducts', verifyAuth.verifyAuthToken, checkOrderStatus, update);
    app.delete('/orderProducts/:id', verifyAuth.verifyAuthToken, deleteOrderProduct);
}

export default orders_products_routes;
