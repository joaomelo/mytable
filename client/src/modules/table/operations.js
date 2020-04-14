import { logThis } from '__cli/modules/logger';
import { requestUnderLimit } from './rate-limiter';

function select (base, table, fieldsToSelect) {
  return requestUnderLimit(rawSelect, base, table, fieldsToSelect);
}

async function rawSelect (base, table, fieldsToSelect) {
  logThis(`started caching ${table}`);

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
  const query = base(table).select({ fields: fieldsToSelect });
  await query.eachPage(page);

  logThis(`cached ${cache.length} record(s) from ${table}`);
  return cache;
}

function update (base, table, id, entries) {
  return requestUnderLimit(rawUpdate, base, table, id, entries);
}

function rawUpdate (base, table, id, entries) {
  const updatePromise = base(table).update(id, entries, { typecast: true });
  const logPromise = logThis(`updated record ${id} from ${table} with ${JSON.stringify(entries)}`);
  return Promise.all([updatePromise, logPromise]);
}

function create (base, table, entries) {
  return requestUnderLimit(rawCreate, base, table, entries);
}

async function rawCreate (base, table, entries) {
  const createPromise = base(table).create(entries, { typecast: true });
  const logPromise = logThis(`created record in ${table} with ${JSON.stringify(entries)}`);
  return Promise.all([createPromise, logPromise]);
}

export { select, update, create };
