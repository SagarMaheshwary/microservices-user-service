// Original file: src/proto/health.proto

import type {
  ServingStatus as _grpc_health_v1_ServingStatus,
  ServingStatus__Output as _grpc_health_v1_ServingStatus__Output,
} from "../../../grpc/health/v1/ServingStatus";

export interface HealthCheckResponse {
  status?: _grpc_health_v1_ServingStatus;
}

export interface HealthCheckResponse__Output {
  status?: _grpc_health_v1_ServingStatus__Output;
}
