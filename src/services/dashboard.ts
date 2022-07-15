import client from '../dbConnection';

export type userOrder = {
    user_id: number;
    user_name: string;
    order_id: number;
    order_status: string;
}

export type topProducts = {
    product_id: number;
    product_name: string;
    count: string;
}

export class dashboard {
    async userOrders(): Promise<userOrder[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT users.id as user_id, users.name as user_name, orders.id as order_id, orders.status as order_status FROM users INNER JOIN orders ON users.id = orders.user_id';
            const result = await conn.query(sql);
            const usersOrders = result.rows;
            conn.release();
            return usersOrders;
        }
        catch (error) {
            throw new Error("Could not select orders for users. Error: " + error);
        }
    }

    async topOrderedProducts(): Promise<topProducts[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT products.id as product_id, products.name as product_name, COUNT(*) FROM order_products INNER JOIN products ON order_products.product_id = products.id GROUP BY (products.id) ORDER BY COUNT(*) DESC';
            const result = await conn.query(sql);
            const topProducts = result.rows;
            conn.release();
            return topProducts;
        }
        catch (error) {
            throw new Error("Could not select orders for users. Error: " + error);
        }
    }
}