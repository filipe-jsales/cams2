/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'mysql.chargedcloud.com.br',
  port: parseInt(process.env.PORT, 10) || 3306,
  username: process.env.DATABASE_USER || '6ba395af-77b0-4b0c-bb9f-816784d39275',
  password: process.env.DATABASE_PASSWORD || 'xdbrowCZ9NLTVV4c8CpY',
  database: process.env.DATABASE_USER || '6ba395af-77b0-4b0c-bb9f-816784d39275',
  entities: [`${__dirname}/src/entities/*.ts`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
