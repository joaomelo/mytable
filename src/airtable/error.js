export { checkJob, checkTransaction };

function checkJob(job) {
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

function checkTransaction(transaction) {
  if (!transaction.job) {
    return 'does not have a job';
  }

  if (!transaction.date) {
    return 'does not have a date';
  }

  if (!transaction.value) {
    return 'does not have a value';
  }
}
