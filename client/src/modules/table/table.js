import { logThis } from '__cli/modules/logger';
import { createBase } from './base';
import { select, create, update } from './operations';

const STATUSES = {
  VIRGIN: 'virgin',
  LOADING: 'loading',
  LOADED: 'loaded',
  BURNED: 'burned'
};

const COMMANDS = {
  CREATE: 'create',
  UPDATE: 'update'
};

class Table {
  constructor (apiKey, baseId, name, fields) {
    this.config = {
      base: createBase(apiKey, baseId),
      name,
      fields
    };
    this.state = {
      status: STATUSES.VIRGIN,
      pendingCommands: [],
      items: []
    };
  }

  async __load () {
    this.state.status = STATUSES.LOADING;
    const { base, name, fields } = this.config;
    this.state.items = await select(base, name, fields);
    this.state.status = STATUSES.LOADED;
  }

  async getItems () {
    if (this.state.status !== STATUSES.LOADED) {
      await this.__load();
    }
    return this.state.items;
  }

  batchCreate (entries) {
    this.state.pendingCommands.push({
      type: COMMANDS.CREATE,
      entries: entries
    });
  }

  batchUpdate (id, entries) {
    const existingCommand = this.state.pendingCommands.find(c => id === c.id);
    if (existingCommand) {
      Object.keys(entries).forEach(k => {
        existingCommand.entries[k] = entries[k];
      });
    } else {
      this.state.pendingCommands.push({
        type: COMMANDS.UPDATE,
        id: id,
        entries: entries
      });
    }
  }

  dispatchCommandBatch () {
    const { name, base } = this.config;
    const commandPromises = [];

    this.state.status = STATUSES.BURNED;
    this.state.pendingCommands.forEach(command => {
      if (command.type === COMMANDS.CREATE) {
        commandPromises.push(create(base, name, command.entries));
      };
      if (command.type === COMMANDS.UPDATE) {
        commandPromises.push(update(base, name, command.id, command.entries));
      };
    });
    const recordsUpdated = this.state.pendingCommands.length;
    this.state.pendingCommands = [];
    const finalLogPromise = Promise.all(commandPromises).then(() => {
      logThis(`updated ${recordsUpdated} record(s) in ${this.config.name}`);
    });

    return finalLogPromise;
  }
}

export { Table };
