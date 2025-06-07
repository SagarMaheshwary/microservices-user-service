import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { context, trace, propagation } from "@opentelemetry/api";

@Injectable()
export class GrpcJaegerInterceptor implements NestInterceptor {
  intercept(contextArg: ExecutionContext, next: CallHandler): Observable<any> {
    const rpcContext = contextArg.switchToRpc();
    const metadata = rpcContext.getContext()?.metadata;

    const carrier: Record<string, string> = {};
    metadata?.forEach((key: string, value: any) => {
      carrier[key] = value;
    });

    const parentCtx = propagation.extract(context.active(), carrier);

    const tracer = trace.getTracer("user-service");
    return context.with(parentCtx, () => {
      const span = tracer.startSpan(contextArg.getHandler().name);
      return next.handle().pipe(
        tap(() => {
          span.end();
        }),
      );
    });
  }
}
