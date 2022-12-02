import { EnemyConsumerModule, EnemyConsumerService } from '@ndl/enemy-consumer';
import { ServerRoom } from '@ndl/shared';
import { Module } from '@nestjs/common';
import { WebsocketProviderGateway } from './websocket-provider.gateway';
import { WebsocketProviderGuard } from './websocket-provider.guard';
import { WebsocketProviderService } from './websocket-provider.service';

@Module({
  imports: [EnemyConsumerModule],
  controllers: [],
  providers: [
    WebsocketProviderGateway,
    WebsocketProviderGuard,
    {
      provide: 'WEBSOCKET_HANDLER_FACTORY',
      useFactory: (enemyConsumerService) => {
        return {
          create: function (
            websocketProviderGateway: WebsocketProviderGateway,
            room: ServerRoom
          ) {
            return new WebsocketProviderService(
              enemyConsumerService,
              websocketProviderGateway,
              room
            );
          },
        };
      },
      inject: [EnemyConsumerService],
    },
  ],
  exports: [WebsocketProviderGateway, WebsocketProviderGuard],
})
export class WebsocketProviderModule {}
