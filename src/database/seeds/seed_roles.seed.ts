import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import RatingDefinition from 'api/rating/entities/rating_definition.entity'
import { RatingDefinitionEnum } from 'api/rating/enums/rating_definition.enum'

export default class SeedRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RatingDefinition)
      .values(Object.values(RatingDefinitionEnum).map(v => ({ value: v })))
      .execute()
  }
}