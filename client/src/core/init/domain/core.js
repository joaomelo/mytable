function loadCore () {
  // both libraries enable async functions
  return Promise.all([
    import(/* webpackChunkName: "polyfill" */ 'core-js/stable'),
    import(/* webpackChunkName: "polyfill" */ 'regenerator-runtime/runtime')
  ]);
}

export { loadCore };
