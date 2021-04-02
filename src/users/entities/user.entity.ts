import { Role } from "common/enums/role.enum";
import Rating from "rating/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 256 })
  public email: string;

  @Column({length: 256})
  public password: string;

  @Column({type: 'text', enum: Role, array: true, default: `{${Role.Admin},${Role.User}}`})
  public roles: Role[];

  @OneToMany(() => Rating, rating => rating.rating)
  public ratings: Rating[];
}