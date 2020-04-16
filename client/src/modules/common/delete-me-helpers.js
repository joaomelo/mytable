import { calcTreeError } from '../errors/errors';

export function getGoodJobs () {
  return this.items.filter(item => !calcTreeError(item, this));
}

export function getRootJobs () {
  return this.getGoodJobs().filter(item => this.isRoot(item));
}

export function isRoot (item) {
  return !item.parent;
}

export function getLeafJobs () {
  return this.getGoodJobs().filter(item => this.isLeaf(item));
}

export function isLeaf (item) {
  return this.getChildJobs(item).length === 0;
}

export function getAscendency (item) {
  const ascendency = [];

  let ascendent = this.getParent(item);
  while (ascendent) {
    ascendency.push(ascendent);
    ascendent = this.getParent(ascendent);
  }

  return ascendency;
}
