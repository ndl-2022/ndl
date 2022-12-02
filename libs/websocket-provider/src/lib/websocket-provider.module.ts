import { ServerRoom } from '@ndl/shared';
import { Module } from '@nestjs/common';
import { WebsocketProviderGateway } from './websocket-provider.gateway';
import { WebsocketProviderGuard } from './websocket-provider.guard';
import { WebsocketProviderService } from './websocket-provider.service';

@Module({
  controllers: [],
  providers: [
    WebsocketProviderGateway,
    WebsocketProviderGuard,
    {
      provide: 'WEBSOCKET_HANDLER_FACTORY',
      useFactory: () => {
        return {
          create: function (
            websocketProviderGateway: WebsocketProviderGateway,
            room: ServerRoom
          ) {
            return new WebsocketProviderService(websocketProviderGateway, room);
          },
        };
      },
    },
  ],
  exports: [WebsocketProviderGateway, WebsocketProviderGuard],
})
export class WebsocketProviderModule {}
