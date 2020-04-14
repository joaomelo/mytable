import Airtable from 'airtable';

function createBase (apiKey, baseId) {
  const airtable = new Airtable({ apiKey, requestTimeout: 60000 });
  const base = airtable.base(baseId);
  return base;
}

export { createBase };
