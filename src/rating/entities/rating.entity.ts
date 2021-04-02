import Movie from "movies/entities/movie.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "users/entities/user.entity";

@Entity()
export default class Rating {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Movie, movie => movie.ratings)
  public movie: Movie;

  @Column()
  public rating: number;

  @ManyToOne(() => User, user => user.id)
  public user: User;
}