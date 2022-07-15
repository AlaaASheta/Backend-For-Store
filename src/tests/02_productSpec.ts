import { productModel } from '../models/products';

const product_Model = new productModel();

describe('Product Model', () => {
    it('index method is exist', () => {
        expect(product_Model.index).toBeDefined();
    });

    it('show method is exist', () => {
        expect(product_Model.show).toBeDefined();
    });

    it('create method is exist', () => {
        expect(product_Model.create).toBeDefined();
    });

    it('update method is exist', () => {
        expect(product_Model.update).toBeDefined();
    });

    it('delete method is exist', () => {
        expect(product_Model.delete).toBeDefined();
    });

    it('create method => add a new product', async () => {
        const result = await product_Model.create({
            name: 'coco de channel',
            description: 'perfume from channel',
            price: 3000,
            category: 'perfumes'
        });
        expect(result).toEqual({
            id: 1,
            name: 'coco de channel',
            description: 'perfume from channel',
            price: 3000,
            category: 'perfumes'
        });
    });

    it('index method => return a list of products', async () => {
        const result = await product_Model.index();
        expect(result).toEqual([{
            id: 1,
            name: 'coco de channel',
            description: 'perfume from channel',
            price: 3000,
            category: 'perfumes'
        }]);
    });

    it('show method => return the correct product', async () => {
        const result = await product_Model.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'coco de channel',
            description: 'perfume from channel',
            price: 3000,
            category: 'perfumes'
        });
    });

    it('delete method => remove the product with selected id', async () => {
        await product_Model.delete(1);
        const result = await product_Model.index();
        expect(result).toEqual([]);
    });
});