import { batchTreeErrorCommand } from './batch-error';
import { batchPathCommand } from './batch-path';

function batchTreeCommands (jobIteration) {
  const error = batchTreeErrorCommand(jobIteration);
  if (!error) {
    batchPathCommand(jobIteration);
  }
}

export { batchTreeCommands };
