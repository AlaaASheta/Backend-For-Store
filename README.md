Storefront Backend

Database:
PSQL Database:
Open PSQL shell and connect to the server then create two database one for dev and another for test.
1.	CREATE DATABASE store_dev;
2.	CREATE DATABASE store_test;
Create Database:
I create 4 tables (users, products, orders, order_products):
1.	db-migrate create users --sql-file
2.	db-migrate create products --sql-file
3.	db-migrate create orders --sql-file
4.	db-migrate create order_products --sql-file
OR Run “npm run createDB”.
To Run:
changes the connection of PSQL in “.env” and “database.json” files by using your postgres connections then create store_dev and store_test databases.
Run Commands:
•	npm i => to install all the used packages.
•	npm run migrate => to migrate up tables of dev database that created and exist in migrations file.
•	npm run test => to run jasmine test (migrate up test database then build and run jasmine then migrate down test database).
•	npm run build => to create build folder (convert ts files to js files).
•	npm run watch => to run the project.
•	npm run deMigrate => if want to migrate down all tables of dev database.

Ports:
1.	Postgres database Port: 5432.
2.	Backend Port: 3000 “http://localhost:3000”.

Environment Variables:

.env file content:
POSTGRES_HOST=localhost
POSTGRES_DB=store_dev
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=alaa123
ENV=dev
BCRYPT_PASSWORD=the_scropion_king
SALT_ROUNDS=10
TOKEN_SECRET=scropions123*

database.json file content:
{
    "dev": {
        "driver": "pg",
        "host": "localhost",
        "database": "store_dev",
        "user": "postgres",
        "password": "alaa123"
    },
    "test": {
        "driver": "pg",
        "host": "localhost",
        "database": "store_test",
        "user": "postgres",
        "password": "alaa123"
    }
}


