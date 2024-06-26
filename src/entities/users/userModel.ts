import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";

  import { Experience } from "../experiences/experienceModel";
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "enum", enum: ["rrhh", "candidate"] })
    role_name!: string;
  
    @Column()
    email!: string;
  
    @Column({ select: false })
    password_hash!: string;
  
    @Column()
    username!: string;
  
    @Column()
    first_name?: string;
  
    @Column()
    last_name?: string;
  
    @Column()
    phone_number?: string;
  
    // 1:1 con Experiences
    @OneToOne(() => Experience, (experience) => experience.user)
    experience?: Experience;
   
  }
  