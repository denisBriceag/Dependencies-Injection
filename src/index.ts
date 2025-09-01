import { Users } from "./services/users";

import type { User, ApiConfig, ILogger } from "./types";
import { createIoCContainer } from "./ioc";
import { IOC_CONTAINER_KEYS } from "./ioc/tokens";

class App {
  private readonly _userService: Users;
  private readonly _logger: ILogger;
  private readonly _config: ApiConfig;

  static $inject = [
    IOC_CONTAINER_KEYS.logger,
    IOC_CONTAINER_KEYS.config,
    IOC_CONTAINER_KEYS.users,
  ];

  constructor(logger: ILogger, userService: Users, config: ApiConfig) {
    this._userService = userService;
    this._logger = logger;
    this._config = config;
  }

  async renderUsers(): Promise<void> {
    const users = await this._userService.getUsers();
    const listNode = document.getElementById("users-list");

    (users || []).forEach((user: User) => {
      const listItemNode = document.createElement("li");

      listItemNode.innerHTML = user.name;
      listNode.appendChild(listItemNode);
    });
  }
}

window.onload = () => {
  const ioc = createIoCContainer();

  const users = ioc.resolve(IOC_CONTAINER_KEYS.users);
  const logger = ioc.resolve(IOC_CONTAINER_KEYS.logger);
  const config = ioc.resolve(IOC_CONTAINER_KEYS.config);

  logger.info("Page is loaded.");

  const app = new App(logger, users, config);

  void app.renderUsers();
};
