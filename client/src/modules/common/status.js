import { getChildren } from './tree';

function isActive ({ item, job }) {
  // if no inactive field is provided all items are considered concluded by default
  // this will result in recurrence been aplied every time.
  const inactiveStatuses = job.inactiveStatuses || [item[job.statusField]];
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
