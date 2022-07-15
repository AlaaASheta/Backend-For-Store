import client from '../dbConnection';
import bcrypt from 'bcrypt';

export type user = {
    id?: number;
    name: string;
    email: string;
    password?: string;
    hash_password?: string;
}

export type userInfo = {
    email: string;
    password: string;
}

export class userModel {

    async index(): Promise<user[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Could not get users. Error:' + error);
        }
    }

    async show(id: number): Promise<user> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error('Could not find user with id:' + id + '. Error:' + error);
        }
    }

    async create(user: user): Promise<user> {
        const emailExistBefore = await this.EmailExistBefore(user.email);
        if (emailExistBefore) {
            throw new Error('Could not add because this email is exist before');
        } else {
            try {
                const conn = await client.connect();
                const sql = 'INSERT INTO users (name, email, hash_password) VALUES ($1, $2, $3) RETURNING *';
                const hashPassword = bcrypt.hashSync(
                    user.password + (process.env.BCRYPT_PASSWORD as string),
                    parseInt(process.env.SALT_ROUNDS as string)
                );
                const result = await conn.query(sql, [user.name, user.email, hashPassword]);
                const newUser = result.rows[0];
                conn.release();
                return newUser;
            } catch (error) {
                throw new Error('Could not add new user. Error: ' + error);
            }
        }
    }

    async update(user: user): Promise<user> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET name=($1), email=($2), hash_password=($3) WHERE id=($4) RETURNING *';
            const hashPassword = bcrypt.hashSync(
                user.password + (process.env.BCRYPT_PASSWORD as string),
                parseInt(process.env.SALT_ROUNDS as string)
            );
            const result = await conn.query(sql, [user.name, user.email, hashPassword, user.id]);
            const updatedUser = result.rows[0];
            conn.release();
            return updatedUser;
        } catch (error) {
            throw new Error('Could update user with id: ' + user.id + '. Error: ' + error);
        }
    }

    async delete(id: number): Promise<user> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const user = result.rows[0]
            conn.release();
            return user;
        } catch (error) {
            throw new Error('Could not delete user with id: ' + id + '. Error: ' + error);
        }
    }

    //function to login with email and password
    async loginAuth(user: userInfo): Promise<user> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE email = ($1)';
            const result = await conn.query(sql, [user.email]);
            conn.release();
            if (result.rows.length) {
                const userResult = result.rows[0];
                if (bcrypt.compareSync(user.password + (process.env.BCRYPT_PASSWORD as string), userResult.hash_password)) {
                    return userResult;
                }
                else {
                    throw new Error('Wrong password');
                }
            }
            throw new Error('Could not find user with email:' + user.email);
        }
        catch (error) {
            throw new Error('Could not find user with email:' + user.email + '. Error:' + error);
        }
    }

    //check if email is exist before or not (email for every user should be unique)
    private async EmailExistBefore(email: string): Promise<boolean> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email]);
            const users = result.rows;
            conn.release();
            if (users.length > 0) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }
}