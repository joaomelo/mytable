import { batchTreeErrorCommand } from './tree-error';

async function batchTreeCommands (jobRun) {
  const items = await jobRun.collection.getItems();
  items.forEach(item => {
    const hasError = batchTreeErrorCommand(item, jobRun);
    if (!hasError) {
      // batchNormal
    }
  });
}

export { batchTreeCommands };
