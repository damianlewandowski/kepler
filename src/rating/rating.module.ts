import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Rating from './entities/rating.entity';
import RatingDefinition from './entities/rating_definition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating,  RatingDefinition])],
})
export class RatingModule {}
