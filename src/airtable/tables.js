import 'airtable/build/airtable.browser.js';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyGtXRgI4o2hamoL' }).base(
  'app8Z2ChqiZn6N3iW'
);

export default {
  buckets: base('buckets'),
  jobs: base('jobs')
};
