export function checkJob(job) {
  if (job.parent_b && job.parent_j) {
    return 'has both job and bucket parents';
  }

  if (!job.parent_b && !job.parent_j) {
    return 'does not has a parent';
  }

  if (job.parent_j && job.id === job.parent_j[0]) {
    return 'parent is pointing to himself';
  }

  if (!job.title) {
    return 'has no title';
  }
}
