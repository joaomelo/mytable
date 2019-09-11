export { profiler };
import { log } from '@/log';

class Profiler {
  constructor() {
    this.stamps = {};
  }

  stamp(name, t0, t1) {
    if (!this.stamps[name]) {
      this.stamps[name] = [];
    }

    this.stamps[name].push(t1 - t0);
  }

  summary(name) {
    const filteredStamps = this.stamps[name];

    const executions = filteredStamps.length;
    const total = filteredStamps.reduce((acc, cur) => acc + cur) / 1000;
    const average = total / executions;

    return {
      name,
      executions,
      total,
      average
    };
  }

  calcSummaries() {
    const summaries = [];
    Object.keys(this.stamps).forEach(k => summaries.push(this.summary(k)));
    return summaries.sort((a, b) => (a.total >= b.total ? 1 : -1));
  }

  convertToLine(data) {
    const n = data.name;
    const x = data.executions.toFixed(0) + 'x';
    const t = data.total.toFixed(2) + 's';
    const a = data.average.toFixed(2) + 's';

    return `${n} | ${x} | tot: ${t} | avg: ${a}`;
  }

  logAndReset() {
    const summaries = this.calcSummaries();

    summaries.forEach(s => log(this.convertToLine(s)));
    log('execution times');

    this.stamps = {};
  }
}

const profiler = new Profiler();
