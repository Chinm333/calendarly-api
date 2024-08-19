import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        uri: process.env.MONGODB_URL,
      }),
      inject: [ConfigService],
    }),
    UsersModule, 
    AppointmentsModule, 
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
