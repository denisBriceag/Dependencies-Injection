import IoCContainer from "ioc-lite";
import { Logger } from "../services/logger";

import { HTTP } from "../services/http";
import { Users } from "../services/users";
import { IOC_CONTAINER_KEYS, IoCResources } from "./tokens";

export const createIoCContainer = () => {
  return new IoCContainer<IoCResources>()
    .register(IOC_CONTAINER_KEYS.config, {
      api: {
        path: "/api",
        resources: {
          users: "/users",
        },
      },
    })
    .registerClass(IOC_CONTAINER_KEYS.logger, Logger)
    .registerClass(IOC_CONTAINER_KEYS.http, HTTP)
    .registerClass(IOC_CONTAINER_KEYS.users, Users);
};
