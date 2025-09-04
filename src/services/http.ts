import type { ApiConfig, ILogger } from "../types";
import { IOC_CONTAINER_KEYS } from "../ioc/tokens";

export class HTTP {
  private readonly _logger: ILogger;
  private readonly _apiConfig: { api: ApiConfig };

  static $singleton = true;
  static $inject = [IOC_CONTAINER_KEYS.config, IOC_CONTAINER_KEYS.logger];

  constructor(apiConfig: { api: ApiConfig }, logger: ILogger) {
    this._apiConfig = apiConfig;
    this._logger = logger;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this._apiConfig.api.path}${url}`);

    if (response.ok) {
      const responseData = await response.json();
      this._logger.info(
        `Status: ${response.status}. Response: ${JSON.stringify(responseData)}`,
      );

      return responseData;
    } else {
      this._logger.error(
        `Status: ${response.status}. Status Text: ${response.statusText}`,
      );
    }
  }
}
