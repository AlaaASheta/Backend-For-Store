import client from '../dbConnection';

export type order = {
    id?: number;
    status: string;
    user_id: string;
}

export class orderModel {

    async index(): Promise<order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Could not get orders. Error:' + error);
        }
    }

    async selectOrdersByUserId(user_id: number): Promise<order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Could not get orders for user that his id: .' + user_id + ' Error:' + error);
        }
    }

    async show(id: number): Promise<order> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Could not find order with id:' + id + '. Error:' + error);
        }
    }

    async create(order: order): Promise<order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.status, order.user_id]);
            const newOrder = result.rows[0];
            conn.release();
            return newOrder;
        } catch (error) {
            throw new Error('Could not add new order. Error: ' + error);
        }
    }

    async update(order: order): Promise<order> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE orders SET status=($1), user_id=($2) WHERE id=($3) RETURNING *';
            const result = await conn.query(sql, [order.status, order.user_id, order.id]);
            const updatedOrder = result.rows[0];
            conn.release();
            return updatedOrder;
        } catch (error) {
            throw new Error('Could update order with id: ' + order.id + '. Error: ' + error);
        }
    }

    async delete(id: number): Promise<order> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (error) {
            throw new Error('Could not delete order with id: ' + id + '. Error: ' + error);
        }
    }
}