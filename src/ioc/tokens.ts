import { ApiConfig } from "../types";
import { Logger } from "../services/logger";
import { HTTP } from "../services/http";
import { Users } from "../services/users";

export type IoCResources = {
  config: { api: ApiConfig };
  logger: typeof Logger;
  http: typeof HTTP;
  users: typeof Users;
};

export const IOC_CONTAINER_KEYS: Record<
  keyof IoCResources,
  keyof IoCResources
> = {
  config: "config",
  logger: "logger",
  http: "http",
  users: "users",
};
