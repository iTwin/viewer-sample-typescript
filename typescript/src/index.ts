import {
  BrowserAuthorizationCallbackHandler,
  BrowserAuthorizationClientConfiguration,
} from "@itwin/browser-authorization";
import { IModelApp } from "@itwin/core-frontend";
import AuthClient from "./clients/Authorization";
import ConfigClient from "./clients/Configuration";

const signIn = async (authConfig: BrowserAuthorizationClientConfiguration) => {
  try {
    await BrowserAuthorizationCallbackHandler.handleSigninCallback(
      authConfig.redirectUri
    );
  } catch {}

  AuthClient.initialize(authConfig);
  const authClient = AuthClient.client;

  return new Promise<boolean>((resolve, reject) => {
    authClient.onAccessTokenChanged.addOnce((token) => resolve(token !== ""));
    authClient.signIn().catch((err) => reject(err));
  });
};

const initialize = async () => {
  await IModelApp.startup({ authorizationClient: AuthClient.client });
  console.log("app started");
};

const startup = async () => {
  await ConfigClient.initialize();
  const config = ConfigClient.config;
  await signIn(config.authorization);
  await initialize();
  const root = document.getElementById("root");
  const hello = document.createElement("span") as HTMLSpanElement;
  hello.innerText = "Hello World";
  root?.appendChild(hello);
};

startup();
