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
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestType = context.getType();
    if (requestType === 'http') {
      const request = context.switchToHttp().getRequest();
      this.logger.verbose(`New request on ${request.url}`);
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          this.logger.verbose(
            `Response for ${request.url}: ${response.statusCode} - ${response.body}`
          );
        })
      );
    } else if (requestType === 'ws') {
      const client = context.switchToWs().getClient();
      const data = context.switchToWs().getData();
      this.logger.verbose(`New request from ${client.id}: ${data}`);
      return next.handle().pipe(
        tap(() => {
          const req = context.switchToWs();
          this.logger.verbose(
            `Response for ${req.getClient()}: ${req.getData()}`
          );
        })
      );
    }
  }
}
