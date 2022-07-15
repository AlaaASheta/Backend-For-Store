import { dashboard } from '../services/dashboard';
import { orderProductsModel } from '../models/order_products';
import { orderModel } from '../models/orders';
import { productModel } from '../models/products';
import { userModel } from '../models/users';

const dashboardService = new dashboard();
const order_product_Model = new orderProductsModel();
const order_Model = new orderModel();
const product_Model = new productModel();
const user_Model = new userModel();


describe('Dashboard', () => {
    it('userOrders method is exist', () => {
        expect(dashboardService.userOrders).toBeDefined();
    });

    it('topOrderedProducts method is exist', () => {
        expect(dashboardService.topOrderedProducts).toBeDefined();
    });

    it('userOrders method => return a list of users with orders', async () => {
        await order_product_Model.create({
            order_id: '2',
            product_id: '2',
            quantity: 1,
            price: 500
        });
        const result = await dashboardService.userOrders();
        expect(result).toEqual([{
            user_id: 2,
            user_name: "Alaa",
            order_id: 2,
            order_status: "active"
        }]);
    });

    it('topOrderedProducts method => return a list of products with its count of existence in order_products descending', async () => {
        const user = await user_Model.create({
            name: 'Eman',
            email: 'eman@gmail.com',
            password: 'emanpassword'
        });
        await product_Model.create({
            name: 'wonder rose',
            description: 'perfume from zara 100ml',
            price: 500,
            category: 'perfumes'
        });
        await order_Model.create({
            status: 'active',
            user_id: '3'
        });
        await order_product_Model.create({
            order_id: '2',
            product_id: '2',
            quantity: 1,
            price: 500
        });
        await order_product_Model.create({
            order_id: '3',
            product_id: '2',
            quantity: 1,
            price: 500
        });
        await order_product_Model.create({
            order_id: '2',
            product_id: '3',
            quantity: 1,
            price: 500
        });
        const result = await dashboardService.topOrderedProducts();
        expect(result).toEqual([{
            product_id: 2,
            product_name: "nuit",
            count: '3'
        },
        {
            product_id: 3,
            product_name: "wonder rose",
            count: '1'
        }
        ]);
    });
});