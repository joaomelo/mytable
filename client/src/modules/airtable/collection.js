import Airtable from 'airtable';
import { select, create, update } from './operations';
import { logThis } from '../logger/domain/logs';

const STATUSES = {
  VIRGIN: 'virgin',
  BURNED: 'burned',
  LOADING: 'loading',
  LOADED: 'loaded'
};

const BATCH_TYPES = {
  CREATE: 'create',
  UPDATE: 'update'
};

class AirtableCollection {
  constructor (apiKey, baseId, name, fields, computations = []) {
    this.config = {
      base: this.__resolveBase(apiKey, baseId),
      name,
      fields,
      computations
    };
    this.state = {
      status: STATUSES.VIRGIN,
      batchCommands: [],
      items: []
    };
  }

  __resolveBase (apiKey, baseId) {
    const airtable = new Airtable({ apiKey, requestTimeout: 60000 });
    const base = airtable.base(baseId);
    return base;
  }

  async __load () {
    this.state.status = STATUSES.LOADING;
    const { base, name, fields } = this.config;
    this.state.items = await select(base, name, fields);
    this.__applyComputations();
    this.state.status = STATUSES.LOADED;
  }

  __applyComputations () {
    const collection = this;
    this.state.items.forEach(i => {
      this.config.computations.forEach(computation => {
        computation(i, collection);
      });
    });
  }

  async getItems () {
    if (this.state.status !== STATUSES.LOADED) {
      await this.__load();
    }
    return this.state.items;
  }

  create (entries) {
    create(this.config.base, this.config.name, entries);
    this.state.status = STATUSES.BURNED;
  }

  update (id, entries) {
    update(this.config.base, this.config.name, id, entries);
    this.state.status = STATUSES.BURNED;
  }

  batchCreate (entries) {
    this.state.batchCommands.push({
      type: BATCH_TYPES.CREATE,
      entries: entries
    });
  }

  batchUpdate (id, entries) {
    const existingCommand = this.state.batchCommands.find(c => id === c.id);
    if (existingCommand) {
      Object.keys(entries).forEach(k => {
        existingCommand.entries[k] = entries[k];
      });
    } else {
      this.state.batchCommands.push({
        type: BATCH_TYPES.UPDATE,
        id: id,
        entries: entries
      });
    }
  }

  runBatches () {
    const { name, base } = this.config;
    const promises = [];

    this.state.batchCommands.forEach(command => {
      if (command.type === BATCH_TYPES.CREATE) {
        promises.push(create(base, name, command.entries));
      };
      if (command.type === BATCH_TYPES.UPDATE) {
        promises.push(update(base, name, command.id, command.entries));
      };
    });
    this.state.batchCommands = [];
    this.state.status = STATUSES.BURNED;
    Promise.all(promises).then(() => {
      logThis(`updated ${this.state.batchCommands.length} record(s) in ${this.config.name}`);
    });
  }
}

export { AirtableCollection };
