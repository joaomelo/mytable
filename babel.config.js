module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/env'];

  return {
    presets
  };
};
