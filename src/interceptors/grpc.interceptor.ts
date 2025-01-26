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
import { getKeyByValue } from "src/helpers/common";
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

    return next.handle().pipe(
      tap({
        next: () => {
          this.prometheusService.incrementGRPCRequestCounter(
            `${serviceName}.${handlerName}`,
            getKeyByValue(status, status.OK),
          );
          this.prometheusService.addGRPCRequestLatencyToHistogram(
            `${serviceName}.${handlerName}`,
            (Date.now() - now) / 1000,
          );
        },
        error: (err) => {
          console.log(err);
          this.prometheusService.incrementGRPCRequestCounter(
            `${serviceName}.${handlerName}`,
            getKeyByValue(status, err.code ?? status.UNKNOWN),
          );
          this.prometheusService.addGRPCRequestLatencyToHistogram(
            `${serviceName}.${handlerName}`,
            (Date.now() - now) / 1000,
          );
        },
      }),
    );
  }
}
