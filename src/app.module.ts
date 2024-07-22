import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppController } from './app.controller';
import { WorkoutModule } from './workouts/workouts.module';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({ 
      isGlobal: true, 
      useFactory: async (config) => {
        const store = await redisStore({
          ttl: 20 * 60 * 1000,
          socket: {
            host: process.env.CACHE_HOST,
            port: 6379
          }
        });
        return { store }
      },
      inject: [ConfigService]
    }),
    DatabaseModule,
    UserModule,
    WorkoutModule,
    AuthModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
