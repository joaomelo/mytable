import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyGtXRgI4o2hamoL' }).base(
  'app8Z2ChqiZn6N3iW'
);

export default {
  async select(table, fieldsToSelect) {
    const cache = [];
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
    return cache;
  },
  async update(table, id, entries) {
    await base(table).update(id, entries);
  }
};
