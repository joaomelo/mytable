import Airtable from 'airtable';
import 'airtable/build/airtable.browser.js';
import { fireDb } from '@/firebase';

export { select, update };

let _base;
async function getTable(name) {
  if (!_base) {
    const doc = await fireDb
      .collection('support')
      .doc('airtable')
      .get();

    const { apiKey, baseId } = doc.data();
    _base = new Airtable({ apiKey: apiKey }).base(baseId);
  }
  return _base(name);
}

async function select(name, fieldsToSelect) {
 const cache = [];
  const table = await getTable(name);
  await table
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
  return cache;
}

async function update(name, id, entries) {
  const table = await getTable(name);
  await table.update(id, entries);
}
