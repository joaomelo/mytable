import Bottleneck from 'bottleneck';
import cache from './cache';
import log from '@/log';

export default {
  updates: [],

  clear() {
    this.updates = [];
  },

  push(table, id, newEntries) {
    let update = this.updates.find(u => u.id === id);
    let entries;

    if (update) {
      entries = update.entries;
    } else {
      update = {
        id: id,
        table: table,
        entries: {}
      };
      this.updates.push(update);
      entries = update.entries;
    }
    Object.keys(newEntries).forEach(k => (entries[k] = newEntries[k]));
  },

  async run() {
    const limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 200
    });

    const update = async u => {
      await u.table.update(u.id, u.entries);
      log(`updated "${cache.titleOf(u.id)}" from "${u.table.name}"`);
    };
    const wrapped = limiter.wrap(update);

    const promises = [];
    if (this.updates && this.updates.length > 0) {
      this.updates.forEach(u => promises.push(wrapped(u)));
      await Promise.all(promises);
      log(`updated ${this.updates.length} record(s)`);
    } else {
      log('nothing to update for now');
    }
  }
};
