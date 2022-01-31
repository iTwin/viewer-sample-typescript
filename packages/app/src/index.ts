/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { FrontendIModelsAccess } from "@itwin/imodels-access-frontend";
import { IModelsClient } from "@itwin/imodels-client-management";
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
import ConfigClient, { ViewerConfiguration } from "./clients/Configuration";
import { addViewport } from "./Viewport";
// import SelectTool from "@itwin/select-tool-extension-sample";   // TODO re-add once the extension API is ready
import "@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css";

/**
 * Sign in or handle sign in callback
 * @param authConfig
 * @returns
 */
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

/**
 * Add iTwin.js extensions
 */
const addExtensions = async () => {
  // TODO re-add once the extension API is ready
  // await IModelApp.extensionAdmin.addBuildExtension(
  //   SelectTool.manifest,
  //   SelectTool.loader
  // );
  // await IModelApp.extensionAdmin.onStartup();
};

/**
 * Initialize iTwin.js
 * @param config
 */
const initialize = async (config: ViewerConfiguration) => {
  const iModelsClient = new IModelsClient({
    api: {
      baseUrl: "https://api.bentley.com/imodels",
    },
  });

  await IModelApp.startup({
    authorizationClient: AuthClient.client,
    hubAccess: new FrontendIModelsAccess(iModelsClient),
    rpcInterfaces: [IModelReadRpcInterface],
    mapLayerOptions: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      BingMaps: {
        key: "key",
        value: config.map?.bingKey ?? "",
      },
    },
  });
  BentleyCloudRpcManager.initializeClient(
    {
      uriPrefix: "https://api.bentley.com",
      info: { title: "imodel/rpc", version: "" },
    },
    [IModelReadRpcInterface, IModelTileRpcInterface, PresentationRpcInterface]
  );
  await addExtensions();
};

/**
 * App startup
 */
const startup = async () => {
  await ConfigClient.initialize();
  const config = ConfigClient.config;
  await signIn(config.authorization);
  await initialize(config);
  const root = document.getElementById("root");
  await addViewport(root as HTMLDivElement, config.iTwinId, config.iModelId);
};

void startup();
