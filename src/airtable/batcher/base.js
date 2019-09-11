import Bottleneck from 'bottleneck';
import Airtable from 'airtable';
import 'airtable/build/airtable.browser.js';
import { log } from '@/log';
import { fireDb } from '@/firebase';
import { profiler } from './profiler';

export { startAirtable, select, update, create };

let base;

async function startAirtable() {
  if (!base) {
    const credentials = await fireDb
      .collection('support')
      .doc('airtable')
      .get();
    const { apiKey, baseId } = credentials.data();

    base = new Airtable({ apiKey: apiKey, requestTimeout: 60000 }).base(baseId);
  }
}

const limiter = new Bottleneck({
  maxConcurrent: 2,
  minTime: 200
});

function select(table, fieldsToSelect) {
  const wrapped = limiter.wrap(freeSelect);
  return wrapped(table, fieldsToSelect);
}

async function freeSelect(table, fieldsToSelect) {
  const cache = [];

  const t0 = performance.now();

  log(`started caching table ${table}`);

  await base(table)
    .select({ fields: fieldsToSelect })
    .eachPage((records, fetchNextPage) => {
      records.forEach(r => {
        const item = {
          id: r.id
        };
        fieldsToSelect.forEach(f => {
          const value = r.get(f);
          if (
            !(Array.isArray(value) && value.length === 0) &&
            !(value === undefined || value === '')
          ) {
            item[f] = value;
          }
        });
        cache.push(item);
      });
      fetchNextPage();
    });

  if (cache.length > 0) {
    await log(`cached ${cache.length} records from ${table}`);
  } else {
    await log(`no records found inside table ${table}`);
  }

  const t1 = performance.now();
  profiler.stamp('freeSelect:' + table, t0, t1);

  return cache;
}

function update(table, id, entries) {
  const wrapped = limiter.wrap(freeUpdate);
  return wrapped(table, id, entries);
}

function freeUpdate(table, id, entries) {
  return base(table).update(id, entries, { typecast: true });
}

function create(table, entries) {
  const wrapped = limiter.wrap(freeCreate);
  return wrapped(table, entries);
}

function freeCreate(table, entries) {
  return base(table).create(entries, { typecast: true });
}
