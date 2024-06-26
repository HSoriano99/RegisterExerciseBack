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

    async login(req: LoginUserRequestBody) {
        const { password, email } = req;
    
        const userRepository = AppDataSource.getRepository(User);
    
        // Validar existencia de email y contraseña
        if (!email || !password) {
          throw new Error("LOGIN CREDENTIALS REQUIRED");
        }
        // Encontrar un usuario por email antes de comparar la contraseña introducida para ahorrar recursos innecesarios.
        //Tambien podriamos hasehar la contraseña introducida y buscar en la db con ella un user,
        //asi no tendríamos que hacer un select de nuestra contraseña para posteriormente compararla, asegurando aún mas la seguridad.
        const user = await userRepository.findOne({
          where: {
            email: email,
          },
          select: {
            id: true,
            password_hash: true,
            email: true,
            role_name: true,
            first_name: true,
            last_name: true,
            phone_number: true,
          },
        });
    
        // Verificar contraseña si el usuario existe
        const isPasswordValid = bcrypt.compareSync(password, user!.password_hash);
    
        // Verificar contraseña valida
        if (!isPasswordValid) {
          throw new Error("BAD LOGIN CREDENTIALS");
        }
    
        // Generar token
    
        const tokenPayload: TokenData = {
          userId: user?.id?.toString() as string,
          userRol: user?.role_name as string,
          userEmail: user?.email as string,
          userFirstName: user?.first_name as string,
          userLastName: user?.last_name as string,
          userPhoneNumber: user?.phone_number as string,
        };
    
        const token = jwt.sign(tokenPayload, "123", {
          expiresIn: "3h",
        });
    
        return token;
      }
  }

