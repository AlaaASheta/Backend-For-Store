import { orderModel } from '../models/orders';
import { userModel } from '../models/users';

const order_Model = new orderModel();
const user_Model = new userModel();


describe('order Model', () => {
    it('index method is exist', () => {
        expect(order_Model.index).toBeDefined();
    });

    it('selectOrdersByUserId method is exist', () => {
        expect(order_Model.selectOrdersByUserId).toBeDefined();
    });

    it('show method is exist', () => {
        expect(order_Model.show).toBeDefined();
    });

    it('create method is exist', () => {
        expect(order_Model.create).toBeDefined();
    });

    it('update method is exist', () => {
        expect(order_Model.update).toBeDefined();
    });

    it('delete method is exist', () => {
        expect(order_Model.delete).toBeDefined();
    });

    it('create method => add a new order', async () => {
        const user = await user_Model.create({
            name: 'Alaa',
            email: 'alaa@gmail.com',
            password: 'alaapassword'
        });
        const result = await order_Model.create({
            status: 'new',
            user_id: '2'
        });
        expect(result).toEqual({
            id: 1,
            status: 'new',
            user_id: '2'
        });
    });

    it('index method => return a list of orders', async () => {
        const result = await order_Model.index();
        expect(result).toEqual([{
            id: 1,
            status: 'new',
            user_id: '2'
        }]);
    });

    it('selectOrdersByUserId method => return a list of orders for the sended user id', async () => {
        const result = await order_Model.selectOrdersByUserId(2);
        expect(result).toEqual([{
            id: 1,
            status: 'new',
            user_id: '2'
        }]);
    });

    it('show method => return the correct order', async () => {
        const result = await order_Model.show(1);
        expect(result).toEqual({
            id: 1,
            status: 'new',
            user_id: '2'
        });
    });

    it('delete method => remove the order with selected id', async () => {
        await order_Model.delete(1);
        const result = await order_Model.index();
        expect(result).toEqual([]);
    });
});