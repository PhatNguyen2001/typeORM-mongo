import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserService } from './repository/User/user.service';
import { UserModule } from './repository/User/user.module';
import { join } from 'path';
import { User } from './entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: true,
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host:  configService.get<string>('DATABASE_HOST') ,
        port:  configService.get<number>('DATABASE_PORT'),
        database:  configService.get<string>('DATABASE_NAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        entities: [User],
        synchronize: true,
      }),
    }),
    UserModule
  ],
  controllers: [AppController,UserController],
  providers: [AppService],
})
export class AppModule {}
