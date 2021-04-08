import { RatingDefinitionEnum } from '../enums/rating-definition.enum';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class RatingDefinition {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: 'enum', enum: RatingDefinitionEnum})
  public value: string;
}