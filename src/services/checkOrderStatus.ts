import { Request, Response } from 'express';
import { orderModel } from '../models/orders';

const order_Model = new orderModel;

const checkOrderStatus = async (req: Request, res: Response, next: Function) => {
    try {
        const order = await order_Model.show(req.body.order_id);
        if (order.status == 'active') {
            next();
        }
        else {
            res.status(400);
            res.json("Could create new order_products with order id:" + req.body.order_id + " because it's status != 'active'.")
        }
    } catch (error) {
        res.status(400);
        res.json('Could select order with id:' + req.body.order_id + ' to check its status.');
    }
}

export default checkOrderStatus;