import {
  BrowserAuthorizationClient,
  BrowserAuthorizationClientConfiguration,
} from "@itwin/browser-authorization";

export class AuthorizationClient {
  private static _client: BrowserAuthorizationClient;

  static initialize(config: BrowserAuthorizationClientConfiguration) {
    this._client = new BrowserAuthorizationClient(config);
  }

  static get client() {
    return this._client;
  }
}

export default AuthorizationClient;
