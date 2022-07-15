import client from '../dbConnection';

export type orderProducts = {
    id?: number;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
}

export class orderProductsModel {

    async index(): Promise<orderProducts[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM order_products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Could not get order_products. Error:' + error);
        }
    }

    async show(id: number): Promise<orderProducts> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM order_products WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Could not find order_product with id:' + id + '. Error:' + error);
        }
    }

    async create(orderProducts: orderProducts): Promise<orderProducts> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [orderProducts.order_id, orderProducts.product_id, orderProducts.quantity, orderProducts.price]);
            const newOrderProduct = result.rows[0];
            conn.release();
            return newOrderProduct;
        } catch (error) {
            throw new Error('Could not add new order_product. Error: ' + error);
        }
    }

    async update(orderProducts: orderProducts): Promise<orderProducts> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE order_products SET order_id=($1), product_id=($2), quantity=($3), price=($4) WHERE id=($5) RETURNING *';
            const result = await conn.query(sql, [orderProducts.order_id, orderProducts.product_id, orderProducts.quantity, orderProducts.price, orderProducts.id]);
            const updatedOrder = result.rows[0];
            conn.release();
            return updatedOrder;
        } catch (error) {
            throw new Error('Could update order_products with id: ' + orderProducts.id + '. Error: ' + error);
        }
    }

    async delete(id: number): Promise<orderProducts> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM order_products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0]
            conn.release();
            return order;
        } catch (error) {
            throw new Error('Could not delete order_product with id: ' + id + '. Error: ' + error);
        }
    }
}