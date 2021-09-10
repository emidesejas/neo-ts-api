import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
export default class Project {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.projects, {
    eager: false
  })
  @JoinColumn({ name: "ownerId" })
  owner: User;
}
