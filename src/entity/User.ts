import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import Bcrypt from "bcrypt";

@Entity()
export default class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = Bcrypt.hashSync(this.password, parseInt(process.env.SALT_ROUNDS, 10));
    }
  }
}
