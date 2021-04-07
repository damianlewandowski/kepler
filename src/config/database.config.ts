import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default () => ({
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,
}) as TypeOrmModuleOptions