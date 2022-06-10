/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { ExtensionHost } from "@itwin/core-extension";

export class CoreTools {
  public static namespace = "CoreTools";
  public static tools = "CoreTools:tools.";
  public static translate(prompt: string) {
    return prompt;
  }
  public static outputPromptByKey(key: string) {
    return ExtensionHost.notifications.outputPromptByKey(this.tools + key);
  }
}
