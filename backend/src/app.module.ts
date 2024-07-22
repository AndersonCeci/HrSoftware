import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { SalaryModule } from './modules/salary/salary.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './modules/events/events.module';
import { RecruimentsModule } from './recruitments/recruitments.module';
import { EmployeeModule } from './employee/employe.module';
import { LeftModule } from './left/left.module';
import { AssetsModule } from './assets/assets.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { LeftService } from './left/left.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DBURL),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    UsersModule,
    RecruimentsModule,
    AuthModule,
   SalaryModule,
    EventsModule,
    EmployeeModule,
    LeftModule,
    AssetsModule
  ],
  controllers: [],
  providers: [AppService, LeftService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes("*")
      console.log("Middleware Applied")
  }
}

