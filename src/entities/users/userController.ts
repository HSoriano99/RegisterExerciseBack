import { User } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../database/data-source";
import { Experience } from "../experiences/experienceModel";
import {
    CreateUserRequestBody,
    LoginUserRequestBody,
    TokenData,
  } from "../../types/types";

  export class UserController {
    async registerUser(req: CreateUserRequestBody) {
      const { password, email } = req;
  
      // Validar existencia de los campos recogidos
      if (!email || !password ) {
        throw new Error("ALL FIELDS REQUIRED");
      }
  
      const userRepository = AppDataSource.getRepository(User);
      
      //Crear nuevo usuario
      const newUser = userRepository.create({
        email,
        password_hash: bcrypt.hashSync(password, 10),
        role_name: "candidate",
      });
      await userRepository.save(newUser);
      //Creamos un nuevo objeto de respuesta para no sacar del controlador el password_hash del nuevo usuario.
      return {
        email: newUser.email,
        role_name: newUser.role_name,
      };
    }
  }

