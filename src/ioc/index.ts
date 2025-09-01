import IoCContainer from "ioc-lite";
import { Logger } from "../services/logger";

import { HTTP } from "../services/http";
import { Users } from "../services/users";
import { IOC_CONTAINER_KEYS, IoCResources } from "./tokens";

const createIoCContainer = () => {
  return new IoCContainer<IoCResources>()
    .registerClass(IOC_CONTAINER_KEYS.logger, Logger)
    .registerClass(IOC_CONTAINER_KEYS.http, HTTP)
    .registerClass(IOC_CONTAINER_KEYS.users, Users);
};

export const ioc = createIoCContainer();
