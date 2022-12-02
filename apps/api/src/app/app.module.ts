import { LoggingInterceptor, LoggingModule } from '@ndl/logging';
import { WebsocketProviderModule } from '@ndl/websocket-provider';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [LoggingModule, WebsocketProviderModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
