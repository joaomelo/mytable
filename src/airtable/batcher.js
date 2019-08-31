import { update as atUpdate } from './base';
import { log } from '@/log';

export { Batcher };

class Batcher {
  constructor() {
    this.updates = [];
  }

  pushMany(updates) {
    updates.forEach(u => this.push(u.table, u.id, u.tag, u.newEntries));
  }

  push(table, id, tag, newEntries) {
    if (Object.keys(newEntries).length > 0) {
      let update = this.updates.find(u => u.id === id);
      if (!update) {
        update = {
          id: id,
          tag: tag,
          table: table,
          entries: {}
        };
        this.updates.push(update);
      }
      Object.keys(newEntries).forEach(k => (update.entries[k] = newEntries[k]));
    }
  }

  async run() {
    const update = async u => {
      await atUpdate(u.table, u.id, u.entries);
      return log(
        `updated "${u.tag}" from ${u.table} with ${JSON.stringify(u.entries)}`
      );
    };

    if (this.updates.length > 0) {
      const promises = [];
      this.updates.forEach(u => promises.push(update(u)));
      await Promise.all(promises);
      log(`updated ${this.updates.length} record(s)`);
    } else {
      log('nothing to update for now');
    }
  }
}
