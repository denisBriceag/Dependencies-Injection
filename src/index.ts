import { Users } from "./services/users";

import type { User } from "./types";
import { ioc } from "./ioc";
import { IOC_CONTAINER_KEYS } from "./ioc/tokens";

class App {
  private readonly _userService: Users;

  constructor() {
    this._userService = ioc.resolve(IOC_CONTAINER_KEYS.users);
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
  /**
   * @description Register config in IOC when application is loaded and there is access to window object
   * */
  ioc.register(IOC_CONTAINER_KEYS.config, window.__CONFIG__);
  delete window.__CONFIG__;

  const logger = ioc.resolve(IOC_CONTAINER_KEYS.logger);

  logger.info("Page is loaded.");

  const app = new App();

  void app.renderUsers();
};
