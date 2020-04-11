import Airtable from 'airtable';
import { getProfile } from '__cli/modules/profiles';

let airtable, base;

function getAirtableBase () {
  const promise = new Promise((resolve, reject) => {
    if (base) {
      resolve(base);
    } else {
      getProfile().then(profile => {
        const { apiKey, baseId } = profile;
        airtable = new Airtable({ apiKey, requestTimeout: 60000 });
        base = airtable.base(baseId);
        resolve(base);
      });
    }
  });

  return promise;
}

export { getAirtableBase };
