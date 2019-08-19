import Bottleneck from 'bottleneck';
import at from './airtable';
import log from './log';

export default function() {
  return {
    updates: [],

    pushMany(updates) {
      updates.forEach(u => this.push(u.table, u.id, u.newEntries));
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
        await at.update(u.table, u.id, u.entries);
        const prettyVals = JSON.stringify(u.entries);
        await log(`updated "${u.id}" with ${prettyVals} from "${u.table}"`);
      };
      const wrapped = limiter.wrap(update);

      const promises = [];
      if (this.updates && this.updates.length > 0) {
        this.updates.forEach(u => promises.push(wrapped(u)));
        await Promise.all(promises);
        await log(`updated ${this.updates.length} record(s)`);
      } else {
        await log('nothing to update for now');
      }
    }
  };
}
