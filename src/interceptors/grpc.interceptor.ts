import { status } from "@grpc/grpc-js";
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { convertHttpExceptionToGrpc, getKeyByValue } from "src/helpers/common";
import { PrometheusService } from "src/modules/prometheus/prometheus.service";

@Injectable()
export class GrpcInterceptor implements NestInterceptor {
  constructor(
    @Inject(PrometheusService)
    private readonly prometheusService: PrometheusService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const handlerName = context.getHandler().name;
    const serviceName = context.getClass().name;

    const label = `${serviceName}.${handlerName}`;

    const recordMetrics = (code: number) => {
      const grpcStatus = getKeyByValue(status, code);
      const duration = (Date.now() - now) / 1000;

      this.prometheusService.grpcRequestCounter.labels(label, grpcStatus).inc();
      this.prometheusService.grpcRequestDuration
        .labels(label)
        .observe(duration);
    };

    return next.handle().pipe(
      tap({
        next: () => recordMetrics(status.OK),
        error: (err) => {
          const error = err.getError() as any;
          const [code] = convertHttpExceptionToGrpc(error.name);

          recordMetrics(code);
        },
      }),
    );
  }
}
