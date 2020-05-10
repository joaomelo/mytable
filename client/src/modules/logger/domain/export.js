import { logsStore } from './logs';

function convertLogsToFile () {
  const logs = logsStore.logs;
  let csvContent = 'data:text/csv;charset=utf-8,';
  const header = 'when,msg';
  const rows = logs.map(log => Object.values({ when: log.prettyWhen, msg: log.msg }).join(','));
  csvContent += header + '\r\n' + rows.join('\n');
  return csvContent;
}

export { convertLogsToFile };
