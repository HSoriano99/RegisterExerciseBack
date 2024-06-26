import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "RegisterExercise",
    // entities: [`${__dirname}/../models/**/*{.js,.ts}`],
    entities: [
        
    ],
    // migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
    migrations: [
       
    ],
    synchronize: false,
    logging: false,
 });
 