import { ApiConfig } from "./index";

export declare global {
  interface Window {
    __CONFIG__: { api: ApiConfig };
  }
}
