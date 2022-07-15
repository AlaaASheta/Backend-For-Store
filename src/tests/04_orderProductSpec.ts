import { orderProductsModel } from '../models/order_products';
import { orderModel } from '../models/orders';
import { productModel } from '../models/products';
import { userModel } from '../models/users';

const order_product_Model = new orderProductsModel();
const order_Model = new orderModel();
const product_Model = new productModel();
const user_Model = new userModel();

describe('order_products Model', () => {
    it('index method is exist', () => {
        expect(order_product_Model.index).toBeDefined();
    });

    it('show method is exist', () => {
        expect(order_product_Model.show).toBeDefined();
    });

    it('create method is exist', () => {
        expect(order_product_Model.create).toBeDefined();
    });

    it('update method is exist', () => {
        expect(order_product_Model.update).toBeDefined();
    });

    it('delete method is exist', () => {
        expect(order_product_Model.delete).toBeDefined();
    });

    it('create method => add a new order_products', async () => {
        await product_Model.create({
            name: 'nuit',
            description: 'perfume from zara 100ml',
            price: 500,
            category: 'perfumes'
        });
        await order_Model.create({
            status: 'active',
            user_id: '2'
        });
        const result = await order_product_Model.create({
            order_id: '2',
            product_id: '2',
            quantity: 1,
            price: 500
        });
        expect(result).toEqual({
            id: 1,
            order_id: '2',
            product_id: '2',
            quantity: 1,
            price: 500
        });
    });

    it('index method => return a list of order_products', async () => {
        const result = await order_product_Model.index();
        expect(result).toEqual([{
            id: 1,
            order_id: '2',
            product_id: '2',
            quantity: 1,
            price: 500
        }]);
    });

    it('show method => return the correct order_product', async () => {
        const result = await order_product_Model.show(1);
        expect(result).toEqual({
            id: 1,
            order_id: '2',
            product_id: '2',
            quantity: 1,
            price: 500
        });
    });

    it('delete method => remove the order_product with selected id', async () => {
        await order_product_Model.delete(1);
        const result = await order_product_Model.index();
        expect(result).toEqual([]);
    });
});