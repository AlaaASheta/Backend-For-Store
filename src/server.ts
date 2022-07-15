import express from 'express';
import bodyParser from 'body-parser';
import user_routes from './handlers/user';
import product_routes from './handlers/product';
import order_routes from './handlers/order';
import dashboard_routes from './handlers/dashboard';
import orders_products_routes from './handlers/order_product';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, (): void => {
    console.log('Server started at http://localhost:' + port)
});


user_routes(app);
product_routes(app);
order_routes(app);
orders_products_routes(app);
dashboard_routes(app);


export default app;