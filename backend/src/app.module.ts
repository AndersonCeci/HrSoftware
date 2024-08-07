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
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './modules/mail/mail.module';
import { LeftService } from './left/left.service';
import { EventsModuleModale } from './events/eventsModale.module';

import { UploadModule } from './upload/upload.module';
import { FirebaseModule } from './upload/firebaseUpload.module';
import { UploadService } from './upload/upload.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DayoffModule } from './dayoff/dayoff.module';
import { InventoryService } from './inventory/inventory.service';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DBURL),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        transport: {
          host: process.env.HOST,
          auth: {
            user: process.env.MAILJET_API_KEY,
            pass: process.env.MAILJET_API_SECRET,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@hrsofware.com>',
        },
        template: {
          dir: join(__dirname, '..','src', 'modules', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RecruimentsModule,
    AuthModule,
    SalaryModule,
    EventsModule,
    MailModule,
    EmployeeModule,
    LeftModule,
    AssetsModule,
    EventsModuleModale,
    UploadModule,
    FirebaseModule,
    TasksModule,
    DayoffModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [AppService, UploadService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    console.log('Middleware Applied');
  }
}

