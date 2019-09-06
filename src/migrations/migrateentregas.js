import 'airtable/build/airtable.browser.js';
import Airtable from 'airtable';
import Bottleneck from 'bottleneck';

const base = new Airtable({ apiKey: 'keyGtXRgI4o2hamoL' }).base(
  'app8Z2ChqiZn6N3iW'
);
let entregas;
let log;

export default async function migrateEntregas(localLog) {
  log = localLog;

  log('downloading records');
  entregas = await cacheRecords('entregas_migrate', [
    'title',
    'status',
    'r_obs',
    'fim',
    'parent_j',
    'description',
    'rotina',
    'periodicidade',
    'tarefas'
  ]);

  const batch = feedEntregasBatch();
  runBatch(batch);
}

function feedEntregasBatch() {
  const makeCreate = e => {
    return {
      title: e.title,
      description: e.description,
      status: e.status,
      r_obs: e.r_obs,
      periodicidade: e.periodicidade,
      tarefas: e.tarefas,
      parent_j: e.parent_j,
      fim: e.fim,
      rotina: e.rotina,
      migrado: 'sim'
    };
  };

  const batch = [];
  entregas.forEach(e => batch.push(makeCreate(e)));
  return batch;
}

async function runBatch(batch) {
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 200
  });
  const create = c => base('jobs').create(c, { typecast: true });
  const wrapped = limiter.wrap(create);

  let i = 0;
  if (batch && batch.length > 0) {
    batch.forEach(async c => {
      const r = await wrapped(c);
      i++;
      log(`created record ${r.id} with title: ${c.title}`);
    });
  }
  log(`created ${i} record(s)`);
}

async function cacheRecords(table, tableFields) {
  const cache = [];

  const eachPage = (records, fetchNextPage) => {
    records.forEach(r => {
      const item = {
        id: r.id
      };
      tableFields.forEach(f => {
        item[f] = r.get(f);
      });
      cache.push(item);
    });
    fetchNextPage();
  };

  await base(table)
    .select({ fields: tableFields })
    .eachPage(eachPage);

  log(`cached ${cache.length} ${table}`);
  return cache;
}
