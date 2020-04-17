import { getChildren } from './tree';

function isActive ({ item, job }) {
  const inactiveStatuses = job.inactiveStatuses || [];
  const isInactive = inactiveStatuses.includes(item[job.statusField]);
  return !isInactive;
}

function hasActiveChildren (jobIteration) {
  const { job } = jobIteration;
  const children = getChildren(jobIteration);
  const activeChildren = children.filter(child => isActive({ item: child, job }));
  return Array.isArray(activeChildren) && activeChildren.length > 0;
}

export { isActive, hasActiveChildren };
