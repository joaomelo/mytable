import { logThis } from '__cli/modules/logger';
import { requestUnderLimit } from './rate-limiter';

function select (base, collection, fieldsToSelect) {
  return requestUnderLimit(rawSelect, base, collection, fieldsToSelect);
}

async function rawSelect (base, collection, fieldsToSelect) {
  logThis(`started caching ${collection}`);

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

function rawUpdate (base, collection, id, entries) {
  const updatePromise = base(collection).update(id, entries, { typecast: true });
  const logPromise = logThis(`updated record ${id} from ${collection} with ${JSON.stringify(entries)}`);
  return Promise.all([updatePromise, logPromise]);
}

function create (base, collection, entries) {
  return requestUnderLimit(rawCreate, base, collection, entries);
}

async function rawCreate (base, collection, entries) {
  const createPromise = base(collection).create(entries, { typecast: true });
  const logPromise = logThis(`created record in ${collection} with ${JSON.stringify(entries)}`);
  return Promise.all([createPromise, logPromise]);
}

export { select, update, create };
