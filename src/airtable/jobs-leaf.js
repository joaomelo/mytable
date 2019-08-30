export { createJobsLeafsUpdates };

function createJobsLeafsUpdates(snapshot) {
  const updates = [];

  const leafsIds = snapshot.getLeafJobs().map(l => l.id);
  snapshot.jobs.forEach(j => {
    const isLeaf = leafsIds.includes(j.id);
    const createUpdate = is => ({
      table: 'jobs',
      id: j.id,
      newEntries: { leaf: is }
    });

    if (isLeaf && !j.leaf) {
      updates.push(createUpdate(true));
    } else if (!isLeaf && j.leaf) {
      updates.push(createUpdate(false));
    }
  });

  return updates;
}
