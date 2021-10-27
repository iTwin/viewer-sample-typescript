import { BrowserAuthorizationClientConfiguration } from "@itwin/browser-authorization";

export interface ViewerConfiguration {
  authorization: BrowserAuthorizationClientConfiguration;
  iTwinId: string;
  iModelId: string;
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
