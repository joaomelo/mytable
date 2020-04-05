import HotCollection from '@joaomelo/hot-collection';
import { firedb } from '__cli/core/firebase';
import { fireauthMachine } from '__cli/modules/auth';

let __profilesCollection;

function getProfilesCollection () {
  if (!__profilesCollection) {
    __profilesCollection = new HotCollection(firedb, 'profiles', {
      saveMode: 'safe',
      where: [{
        field: 'userId',
        operator: '==',
        value: fireauthMachine.user.uid
      }]
    });
  }
  return __profilesCollection;
}

function getProfile () {
  const collection = getProfilesCollection();
  const profile = collection.getItem(fireauthMachine.user.uid);
  return profile;
}

function updateProfile (newProfile) {
  const profilesColletion = getProfilesCollection();
  return profilesColletion.set(newProfile);
}

export { getProfile, updateProfile };
