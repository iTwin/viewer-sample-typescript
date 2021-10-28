import { IModelHubFrontend } from "@bentley/imodelhub-client";
import {
  BrowserAuthorizationCallbackHandler,
  BrowserAuthorizationClientConfiguration,
} from "@itwin/browser-authorization";
import {
  BentleyCloudRpcManager,
  IModelReadRpcInterface,
  IModelTileRpcInterface,
} from "@itwin/core-common";
import { IModelApp } from "@itwin/core-frontend";
import { PresentationRpcInterface } from "@itwin/presentation-common";
import AuthClient from "./clients/Authorization";
import ConfigClient from "./clients/Configuration";
import { addViewport } from "./Viewport";

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
  await IModelApp.startup({
    authorizationClient: AuthClient.client,
    hubAccess: new IModelHubFrontend(),
    rpcInterfaces: [IModelReadRpcInterface],
  });
  BentleyCloudRpcManager.initializeClient(
    {
      uriPrefix: "https://dev-api.bentley.com/imodeljs",
      info: { title: "visualization", version: "v3.0" },
    },
    [IModelReadRpcInterface, IModelTileRpcInterface, PresentationRpcInterface]
  );
  console.log("app started");
};

const startup = async () => {
  await ConfigClient.initialize();
  const config = ConfigClient.config;
  await signIn(config.authorization);
  await initialize();
  const root = document.getElementById("root") as HTMLDivElement;
  await addViewport(root, config.iTwinId, config.iModelId);
};

startup();
