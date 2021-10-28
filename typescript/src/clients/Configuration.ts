import { BrowserAuthorizationClientConfiguration } from "@itwin/browser-authorization";

interface ViewerMapConfiguration {
  bingKey: string;
}

export interface ViewerConfiguration {
  authorization: BrowserAuthorizationClientConfiguration;
  iTwinId: string;
  iModelId: string;
  map?: ViewerMapConfiguration;
}

class ConfigurationClient {
  private static _config: ViewerConfiguration;

  static async initialize() {
    this._config = (await (
      await fetch(`${location.origin}/config-local.json`)
    ).json()) as ViewerConfiguration;
  }

  public static get config() {
    return this._config;
  }
}

export default ConfigurationClient;
