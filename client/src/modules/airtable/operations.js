import { logThis } from '__cli/modules/logs';
import { requestUnderLimit } from './rate-limiter';
import { getAirtableBase } from './airtable-base';

function select (collection, fieldsToSelect) {
  return requestUnderLimit(rawSelect, collection, fieldsToSelect);
}

async function rawSelect (collection, fieldsToSelect) {
  logThis(`started caching collection ${collection}`);

  const base = await getAirtableBase();
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

function update (collection, id, entries) {
  return requestUnderLimit(rawUpdate, id, entries);
}

async function rawUpdate (collection, id, entries) {
  const base = await getAirtableBase();
  return base(collection).update(id, entries, { typecast: true });
}

function create (collection, entries) {
  return requestUnderLimit(rawCreate, entries);
}

async function rawCreate (collection, entries) {
  const base = await getAirtableBase();
  return base(collection).create(entries, { typecast: true });
}

export { select, update, create };
