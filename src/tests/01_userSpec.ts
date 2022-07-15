import { userModel } from '../models/users';

const user_Model = new userModel();

describe('User Model', () => {
    it('index method is exist', () => {
        expect(user_Model.index).toBeDefined();
    });

    it('show method is exist', () => {
        expect(user_Model.show).toBeDefined();
    });

    it('create method is exist', () => {
        expect(user_Model.create).toBeDefined();
    });

    it('update method is exist', () => {
        expect(user_Model.update).toBeDefined();
    });

    it('delete method is exist', () => {
        expect(user_Model.delete).toBeDefined();
    });

    it('create method => add a new user', async () => {
        const result = await user_Model.create({
            name: 'Alaa Atef',
            email: 'alaaAtef@gmail.com',
            password: 'alaapassword'
        });
        delete result['hash_password'];
        expect(result).toEqual({
            id: 1,
            name: 'Alaa Atef',
            email: 'alaaAtef@gmail.com'
        });
    });

    it('index method => return a list of users', async () => {
        const result = await user_Model.index();
        delete result[0]['hash_password'];
        expect(result).toEqual([{
            id: 1,
            name: 'Alaa Atef',
            email: 'alaaAtef@gmail.com'
        }]);
    });

    it('show method => return the correct user', async () => {
        const result = await user_Model.show(1);
        delete result['hash_password'];
        expect(result).toEqual({
            id: 1,
            name: 'Alaa Atef',
            email: 'alaaAtef@gmail.com'
        });
    });

    it('delete method => remove the user with selected id', async () => {
        await user_Model.delete(1);
        const result = await user_Model.index();
        expect(result).toEqual([]);
    });
});