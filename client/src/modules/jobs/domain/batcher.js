class Batcher {
  pushCommands (commands) {
    if (commands) {
      const newCommands = Array.isArray(commands) ? commands : [commands];
      newCommands.forEach(c => this.pushCommand(c));
    }
  }
}

export { Batcher };
