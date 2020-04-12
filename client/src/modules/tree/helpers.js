import { calcTreeError } from './batch-error';

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

export function getChildJobs (parent) {
  return this.getGoodJobs().filter(
    item => item.parent && item.parent[0] === parent.id
  );
}

export function getParent ({ item, items, job }) {
  const parentId = item[job.parentField] ? item[job.parentField][0] : null;
  const parent = parentId
    ? items.find(possibleParent => possibleParent.id === parentId && possibleParent.id !== item.id)
    : null;
  return parent;
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

export function getTransactions (item, includeChildren = false) {
  let transactions = this.transactions.filter(
    t => t.item && t.item[0] === item.id
  );

  if (includeChildren) {
    const childrenJobs = this.getChildJobs(item);
    if (childrenJobs && childrenJobs.length > 0) {
      childrenJobs.forEach(childJob => {
        transactions = transactions.concat(
          this.getTransactions(childJob, includeChildren)
        );
      });
    }
  }

  return transactions;
}
