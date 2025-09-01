import { HTTP } from "./http";

import type { ApiConfig, User } from "../types";
import { IOC_CONTAINER_KEYS } from "../ioc/tokens";

export class Users {
  private readonly _http: HTTP;
  private readonly _apiConfig: { api: ApiConfig };

  static $singleton = true;
  static $inject = [IOC_CONTAINER_KEYS.http, IOC_CONTAINER_KEYS.config];

  constructor(http: HTTP, config: { api: ApiConfig }) {
    this._http = http;
    this._apiConfig = config;
  }

  getUsers(): Promise<User[]> {
    return this._http.get<User[]>(this._apiConfig.api.resources.users);
  }
}
