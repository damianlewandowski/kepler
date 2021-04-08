import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Id } from 'types';
import CreateMovieDto from './dto/create-movie.dto';
import Movie from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>
  ) { }

  async insert(createMovieDto: CreateMovieDto): Promise<Id> {
    const movie = new Movie();
    movie.name = createMovieDto.name;
    const createdMovie = await this.moviesRepository.save(movie)
    return { id: createdMovie.id }
  }
}
