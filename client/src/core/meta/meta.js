import * as data from '__cli/../../package.json';

function appName () {
  const title = data.default.name;
  return title;
}

function appVersion () {
  const rawVersion = data.default.version;
  const prefix = 'v';
  const posfix = appEnviroment() === 'prod' ? '' : 'd';
  return prefix + rawVersion + posfix;
}

function appTitle () {
  const title = `${appName()} ${appVersion()}`;
  return title;
}

function appEnviroment () {
  const result = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  return result;
}

export { appName, appVersion, appTitle, appEnviroment };
