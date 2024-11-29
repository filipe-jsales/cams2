import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CamsModule } from './cams/cams.module';
import { RoleModule } from './role/role.module';
import { GroupsModule } from './groups/groups.module';
import { MosaicsModule } from './mosaics/mosaics.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    CamsModule,
    RoleModule,
    GroupsModule,
    MosaicsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
