import { batchTreeErrorCommand } from './tree-error';

async function batchTreeCommands (item, job) {
  const error = batchTreeErrorCommand(item, job);
  if (!error) {
    // run other commands
  }
}

export { batchTreeCommands };
