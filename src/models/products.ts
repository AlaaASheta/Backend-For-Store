import client from '../dbConnection';

export type product = {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

export class productModel {

    async index(): Promise<product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products ORDER BY id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Could not get products. Error:' + error);
        }
    }

    async show(id: number): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Could not find product with id:' + id + '. Error:' + error);
        }
    }

    async create(product: product): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [product.name, product.description, product.price, product.category]);
            const newProduct = result.rows[0];
            conn.release();
            return newProduct;
        } catch (error) {
            throw new Error('Could not add new product. Error: ' + error);
        }
    }

    async update(product: product): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE products SET name=($1), description=($2), price=($3), category=($4) WHERE id=($5) RETURNING *';
            const result = await conn.query(sql, [product.name, product.description, product.price, product.category, product.id]);
            const updatedProduct = result.rows[0];
            conn.release();
            return updatedProduct;
        } catch (error) {
            throw new Error('Could update product with id: ' + product.id + '. Error: ' + error);
        }
    }

    async delete(id: number): Promise<product> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const product = result.rows[0]
            conn.release();
            return product;
        } catch (error) {
            throw new Error('Could not delete product with id: ' + id + '. Error: ' + error);
        }
    }
}