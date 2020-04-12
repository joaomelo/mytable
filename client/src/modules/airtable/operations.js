import { logThis } from '__cli/modules/logger';
import { requestUnderLimit } from './rate-limiter';

function select (base, collection, fieldsToSelect) {
  return requestUnderLimit(rawSelect, base, collection, fieldsToSelect);
}

async function rawSelect (base, collection, fieldsToSelect) {
  logThis(`started caching collection ${collection}`);

  const cache = [];
  const page = (records, fetchNextPage) => {
    records.forEach(r => {
      const item = { id: r.id };
      fieldsToSelect.forEach(f => {
        const value = r.get(f);
        if (value && !(Array.isArray(value) && value.length === 0)) {
          item[f] = value;
        }
      });
      cache.push(item);
    });
    fetchNextPage();
  };
  const query = base(collection).select({ fields: fieldsToSelect });
  await query.eachPage(page);

  logThis(`cached ${cache.length} record(s) from ${collection}`);
  return cache;
}

function update (base, collection, id, entries) {
  return requestUnderLimit(rawUpdate, base, collection, id, entries);
}

async function rawUpdate (base, collection, id, entries) {
  return base(collection).update(id, entries, { typecast: true });
}

function create (base, collection, entries) {
  return requestUnderLimit(rawCreate, base, collection, entries);
}

async function rawCreate (base, collection, entries) {
  return base(collection).create(entries, { typecast: true });
}

export { select, update, create };
