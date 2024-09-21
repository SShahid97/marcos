## REST APIs in Node.js with Express, Postgres & SequelizeORM

### Creating model and migration using sequelize-cli 
npx sequelize-cli model:generate --name <model_name> --attributes <attribute_name>:<data_type>, ....
e,g
npx sequelize-cli model:generate --name project --attributes title:string

### Running the migration
npx sequelize-cli db:migrate

### Undo the recent migration
npx sequelize-cli db:migrate:undo
