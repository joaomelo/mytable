import 'airtable/build/airtable.browser.js';
import Airtable from 'airtable';
import Bottleneck from 'bottleneck';

const base = new Airtable({ apiKey: 'keyGtXRgI4o2hamoL' }).base(
  'app8Z2ChqiZn6N3iW'
);
let cachedDatabase;
let log;

export default async function updateMyAirtable(localLog) {
  log = localLog;

  //cache tables
  cachedDatabase = {
    buckets: await cacheRecords('buckets', ['title']),
    jobs: await cacheRecords('jobs', ['title', 'parent_b', 'parent_j', 'path'])
  };

  //update batch
  batch.clear();

  const rootJobs = cachedDatabase.jobs.filter(j => j.parent_b);
  feedJobsBatch(rootJobs);
  runBatch();
}

const batch = {
  updates: [],

  clear() {
    this.updates = [];
  },

  pushUpdate(table, id, field, value) {
    this.updates.push({
      table: table,
      id: id,
      field: field,
      value: value
    });
  }
};

async function runBatch() {
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 200
  });
  const update = u => base(u.table).update(u.id, { [u.field]: u.value });
  const wrapped = limiter.wrap(update);

  let i = 0;
  if (batch.updates && batch.updates.length > 0) {
    batch.updates.forEach(async u => {
      await wrapped(u);
      i++;
      log(`updated record ${u.id} field ${u.field} with value: ${u.value}`);
    });
  }
  log(`updated ${i} record(s)`);
}

async function cacheRecords(table, tableFields) {
  const cache = [];

  const eachPage = (records, fetchNextPage) => {
    records.forEach(r => {
      const item = {
        id: r.id
      };
      tableFields.forEach(f => {
        const value = r.get(f);
        item[f] = Array.isArray(value) ? value[0] : value;
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

function feedJobsBatch(jobs) {
  const jobCheck = j => {
    if (j.parent_b && j.parent_j) {
      batch.pushUpdate('jobs', j.id, 'parent_j', '');
    }
    if (!(j.parent_b || j.parent_j)) {
      batch.pushUpdate('jobs', j.id, 'path', 'please select a parent');
    } else if (!j.title) {
      batch.pushUpdate('jobs', j.id, 'path', 'please type a title');
    } else {
      const newPath = jobPath(j, '');
      if (!j.path || j.path != newPath) {
        batch.pushUpdate('jobs', j.id, 'path', newPath);
      }
    }
  };

  jobs.forEach(jobCheck);
  const childrenItems = cachedDatabase.jobs.filter(child =>
    jobs.find(parent => parent.id == child.parent_j)
  );
  if (childrenItems && childrenItems.length > 0) {
    feedJobsBatch(childrenItems);
  }
}

function jobPath(job, path) {
  if (job.parent_b) {
    const bucket = cachedDatabase.buckets.find(b => b.id == job.parent_b);
    return `${bucket.title}/${job.title}`;
  } else if (job.parent_j) {
    const parent = cachedDatabase.jobs.find(j => j.id == job.parent_j);
    return `${jobPath(parent, path)}/${job.title}`;
  }
}
