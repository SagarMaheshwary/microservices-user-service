// Original file: src/proto/health.proto

export const ServingStatus = {
  UNKNOWN: 0,
  SERVING: 1,
  NOT_SERVING: 2,
  SERVICE_UNKNOWN: 3,
} as const;

export type ServingStatus =
  | "UNKNOWN"
  | 0
  | "SERVING"
  | 1
  | "NOT_SERVING"
  | 2
  | "SERVICE_UNKNOWN"
  | 3;

export type ServingStatus__Output =
  (typeof ServingStatus)[keyof typeof ServingStatus];
