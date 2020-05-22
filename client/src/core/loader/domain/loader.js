const loader = {
  state: {
    stack: 0,
    status: 'IDLE'
  },

  run (promiseOrFunction) {
    this.start();
    const promise = typeof promiseOrFunction === 'function'
      ? Promise.resolve(promiseOrFunction())
      : promiseOrFunction;
    promise.finally(this.stop());
  },

  start () {
    this.state.stack++;
    this.state.status = 'LOADING';
  },

  stop () {
    this.state.stack--;
    if (this.state.stack <= 0) {
      this.state.status = 'IDLE';
      this.state.stack = 0;
    }
  },

  get status () {
    return this.state.status;
  }
};

export { loader };
