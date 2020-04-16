import { batchRecurrenceTypeCommand } from './batch-type';

function batchRecurrenceCommands (jobIteration) {
  // const error = batchErrorCommand(jobIteration);
  // if (!error) {
  //   batchPathCommand(jobIteration);
  // }
  batchRecurrenceTypeCommand(jobIteration);
}

export { batchRecurrenceCommands };
