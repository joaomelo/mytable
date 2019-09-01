export { nodeTypes, calcFreshNodeType, createNodeTypeEntry };

const nodeTypes = {
  leaf: '🍀',
  root: '🥔',
  branch: '🌿'
};

function calcFreshNodeType(job, snapshot) {
  let type;
  if (snapshot.isLeaf(job)) {
    type = nodeTypes.leaf;
  } else if (snapshot.isRoot(job)) {
    type = nodeTypes.root;
  } else {
    type = nodeTypes.branch;
  }
  return type;
}

function createNodeTypeEntry(job, snapshot) {
  const newType = calcFreshNodeType(job, snapshot);
  return newType !== job.ntype ? { ntype: newType } : undefined;
}
