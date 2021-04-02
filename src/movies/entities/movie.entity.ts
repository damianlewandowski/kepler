import Rating from "rating/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Movie {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 256 })
  public name: string;

  @OneToMany(() => Rating, rating => rating.movie)
  public ratings: Rating[];
}