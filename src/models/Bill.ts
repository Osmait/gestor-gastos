import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  amount: string;

  @ManyToOne(() => User, (user) => user.id)
  user_: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_ad: Date;
}
