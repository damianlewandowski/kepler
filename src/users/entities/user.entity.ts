import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 256 })
  public email: string;

  @Column({length: 256})
  public password: string;
}