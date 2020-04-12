import { update, create } from '../../airtable/base';
import { log } from '__cli/modules/jobs/batcher/__cli/log';
import { profiler } from './profiler';

class Batcher {
  constructor (snapshot) {
    this.snapshot = snapshot;
    this.register = [];
    this.commands = [];
  }

  registerFunctions (collection, funcs) {
    funcs.forEach(f => this.registerFunction(collection, f));
  }

  registerFunction (collection, func) {
    this.register.push({ collection: collection, func: func });
  }

  processSnapshot () {
    const collections = this.snapshot.listCollections();

    Object.keys(collections).forEach(collection => {
      const functionsForThisTable = this.register
        .filter(r => r.collection === collection)
        .map(r => r.func);

      collections[collection].forEach(record => {
        functionsForThisTable.forEach(f => {
          const t0 = performance.now();

          const commands = f(record, this.snapshot);

          const t1 = performance.now();
          profiler.stamp(f.name, t0, t1);

          this.pushCommands(commands);
        });
      });
    });
  }

  pushCommands (commands) {
    if (commands) {
      const newCommands = Array.isArray(commands) ? commands : [commands];
      newCommands.forEach(c => this.pushCommand(c));
    }
  }

  async runCommand (command) {
    if (command.type === 'create') {
      await create(command.collection, command.entries);
    } else {
      await update(command.collection, command.id, command.entries);
    }

    const { type, tag, collection, entries } = command;
    await log(`${type}d "${tag}" in ${collection} with ${JSON.stringify(entries)}`);
  }

  async run () {
    const t0 = performance.now();

    this.processSnapshot();

    if (this.commands.length > 0) {
      const promises = this.commands.map(c => this.runCommand(c));
      await Promise.all(promises);
      await log(`updated and created ${this.commands.length} record(s)`);
    } else {
      await log('nothing to update for now');
    }

    const t1 = performance.now();
    profiler.stamp('batcher run', t0, t1);
    profiler.logAndReset();
  }
}

export { Batcher };
