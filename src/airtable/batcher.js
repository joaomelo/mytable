import { update, create } from './base';
import { log } from '@/log';

export { Batcher };

class Batcher {
  constructor() {
    this.updates = [];
    this.creates = [];
  }

  pushCreates(creates) {
    creates.forEach(c =>
      this.creates.push({
        table: c.table,
        tag: c.tag,
        entries: c.entries
      })
    );
  }

  pushMany(updates) {
    updates.forEach(u => this.push(u.table, u.id, u.tag, u.newEntries));
  }

  push(table, id, tag, newEntries) {
    if (Object.keys(newEntries).length > 0) {
      let updateRecord = this.updates.find(u => u.id === id);
      if (!updateRecord) {
        updateRecord = {
          id: id,
          tag: tag,
          table: table,
          entries: {}
        };
        this.updates.push(updateRecord);
      }
      Object.keys(newEntries).forEach(
        k => (updateRecord.entries[k] = newEntries[k])
      );
    }
  }

  async run() {
    const atomRun = async (r, isCreate) => {
      const op = isCreate ? 'created' : 'updated';
      const pretty = JSON.stringify;

      if (isCreate) {
        await create(r.table, r.entries);
      } else {
        await update(r.table, r.id, r.entries);
      }
      await log(`${op} "${r.tag}" in ${r.table} with ${pretty(r.entries)}`);
    };

    if (this.updates.length > 0 || this.creates.length > 0) {
      const promises = [];
      this.creates.forEach(c => promises.push(atomRun(c, true)));
      this.updates.forEach(u => promises.push(atomRun(u, false)));
      await Promise.all(promises);

      log(
        `updated and created ${this.updates.length +
          this.creates.length} record(s)`
      );
    } else {
      log('nothing to update for now');
    }
  }
}
