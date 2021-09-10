import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import Bcrypt from "bcrypt";
import Project from "./Project";

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

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = Bcrypt.hashSync(this.password, parseInt(process.env.SALT_ROUNDS, 10));
    }
  }

  @OneToMany(() => Project, project => project.owner, {
    eager: false
  })
  projects: Project[];

  safeData() {
    const {
      password,
      ...data
    } = this;
    return data;
  }
}
