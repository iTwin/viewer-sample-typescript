# Typescript Viewer Sample

## Running the Sample

1. From a terminal at any directory within the repo, execute "rush install".
2. From a terminal at any directory within the repo, execute "rush build". This should only need to be done once to build both the apps and the extensions. This repo is currently not setup for a production build of the apps, but the build script will ensure that extension is also compiled.
3. Make a copy of the config.json file and name it "config-local.json". Add values to the keys in your config.local.json file. At a minimum, all auth client information as well as an iTwinId and iModelId are required to run the application. If you do not already have an iTwin application client id, you can obtain one [here](https://developer.bentley.com/register/). Your client should include the following:
4. Make a copy of the config.json file and name it "config-local.json". Add values to the keys in your config.local.json file. At a minimum, all auth client information as well as an iTwinId and iModelId are required to run the application. If you do not already have an iTwin application client id, you can obtain one [here](https://developer.bentley.com/register/).

- Your client should include the following:
  - API Associations - Visualization (this will add the "email openid profile organization itwinjs" scopes)
  - Application type - SPA
  - Redirect URIs - http://localhost:3000

4. From a terminal at the root of the "typescript" directory, execute "npm start". This will start compile the application in watch mode and start an http server on port 3000.
5. Navigate to http://localhost:3000 in your browser
