import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Need to update the interceptor when we can better test it
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestType = context.getType();
    if (requestType === 'http') {
      const request = context.switchToHttp().getRequest();
      Logger.verbose(`New request on ${request.url}`);
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          Logger.verbose(
            `Response for ${request.url}: ${response.statusCode} - ${response.body}`
          );
        })
      );
    } else if (requestType === 'ws') {
      const client = context.switchToWs().getClient();
      const clientRoom = client.rooms ?? client.rooms[0];
      const data = context.switchToWs().getData();
      Logger.verbose(
        `New request from ${client.id} room ${clientRoom}: ${
          data ? data.toString() : ''
        }`
      );
      return next.handle().pipe(
        tap(() => {
          const req = context.switchToWs();
          const client = context.switchToWs().getClient();
          const clientRoom = client.rooms ?? client.rooms[0];
          Logger.verbose(
            `Response for ${client.id} room ${clientRoom}: ${req.getData()}`
          );
        })
      );
    }
  }
}
