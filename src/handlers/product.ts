import express, { Request, Response } from 'express';
import { productModel } from '../models/products';
import verifyAuth from '../services/verifyAuth';

const product = new productModel;

const index = async (_req: Request, res: Response) => {
    try {
        const products = await product.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const products = await product.show(req.params.id as unknown as number);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const create = async (req: Request, res: Response) => { 
    try {
        const newProduct = await product.create(req.body);
        res.json(newProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await product.update(req.body);
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const products = await product.delete(req.params.id as unknown as number);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', verifyAuth.verifyAuthToken, index);
    app.get('/products/:id', verifyAuth.verifyAuthToken, show);
    //using verifyAuthToken to check if the sended token in request is correct
    app.post('/products', verifyAuth.verifyAuthToken, create);
    app.put('/products', verifyAuth.verifyAuthToken, update);
    app.delete('/products/:id', verifyAuth.verifyAuthToken, deleteProduct);
}

export default product_routes;
