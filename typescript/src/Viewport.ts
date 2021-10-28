import {
  CheckpointConnection,
  IModelApp,
  ScreenViewport,
  ViewCreator3d,
} from "@itwin/core-frontend";

export const addViewport = async (
  parentDiv: HTMLDivElement,
  iTwinId: string,
  iModelId: string
) => {
  const iModelConnection = await CheckpointConnection.openRemote(
    iTwinId,
    iModelId
  );
  if (iModelConnection) {
    // create a container div
    const viewPortContainer = document.createElement("div") as HTMLDivElement;
    viewPortContainer.style.height = "100vh";
    viewPortContainer.style.width = "100%";
    viewPortContainer.id = "viewport-container";
    parentDiv.appendChild(viewPortContainer);

    // obtain a viewState for the model and add it to a Viewport within the container
    const viewCreator = new ViewCreator3d(iModelConnection);
    const viewState = await viewCreator.createDefaultView();
    const vp = ScreenViewport.create(viewPortContainer, viewState);
    IModelApp.viewManager.addViewport(vp);
  }
};
