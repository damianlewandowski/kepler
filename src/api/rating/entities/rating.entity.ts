import Movie from "api/movies/entities/movie.entity";
import User from "api/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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