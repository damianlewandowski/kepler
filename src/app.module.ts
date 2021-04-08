import { Module } from '@nestjs/common';
import { AuthModule } from 'api/auth/auth.module';
import { MoviesModule } from 'api/movies/movies.module';
import { RatingModule } from 'api/rating/rating.module';
import { UsersModule } from 'api/users/users.module';
import { ConfigModule } from 'config/config.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    MoviesModule,
    RatingModule,
  ],
})
export class AppModule { }
