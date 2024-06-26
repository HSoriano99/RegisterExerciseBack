import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateExperiences1719394829424 } from "../entities/experiences/1719394829424-createExperiences";
import { Experience } from "../entities/experiences/experienceModel";
import { CreateUsers1719389972894 } from "../entities/users/1719389972894-createUsers";
import { User } from "../entities/users/userModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "RegisterExercise",
    // entities: [`${__dirname}/../models/**/*{.js,.ts}`],
    entities: [
        User,
        Experience
    ],
    // migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
    migrations: [
        CreateUsers1719389972894,
        CreateExperiences1719394829424
    ],
    synchronize: false,
    logging: false,
 });
 