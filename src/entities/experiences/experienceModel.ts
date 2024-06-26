import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "../users/userModel";

@Entity("experiences")
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  software_education!: string;

  @Column()
  dev_language!: string;

  @Column()
  dev_position!: string;

  @Column()
  work_experience!: string;

   // 1:1 con Users
   @OneToOne(() => User, (user) => user.experience)
   @JoinColumn ({name: "user_id", referencedColumnName: "id"})
   user?: User;

}