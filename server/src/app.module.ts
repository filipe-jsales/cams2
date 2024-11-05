import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

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
      host: process.env.DATABASE_HOST || 'mysql.chargedcloud.com.br',
      port: parseInt(process.env.PORT, 10) || 3306,
      username:
        process.env.DATABASE_USER || '6ba395af-77b0-4b0c-bb9f-816784d39275',
      password: process.env.DATABASE_PASSWORD || 'xdbrowCZ9NLTVV4c8CpY',
      database:
        process.env.DATABASE_NAME || '6ba395af-77b0-4b0c-bb9f-816784d39275',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
