import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketProviderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToWs();
    const client = request.getClient<Socket>();
    if (client.eventNames().find((e) => e === 'joinRoom') || client.rooms) {
      return true;
    } else {
      return false;
    }
  }
}
