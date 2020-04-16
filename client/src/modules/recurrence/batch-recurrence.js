import { batchRecurrenceTypeCommand } from './batch-type';
// import { batchRecurrenceInstances } from './batch-instances';

function batchRecurrenceCommands (jobIteration) {
  batchRecurrenceTypeCommand(jobIteration);
  // batchRecurrenceInstances(jobIteration);
}

export { batchRecurrenceCommands };
