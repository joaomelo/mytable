import { update, create } from './base';
import { log } from '@/log';

export { Batcher };

class Batcher {
  constructor(snapshot) {
    this.snapshot = snapshot;
    this.register = [];
    this.commands = [];
  }

  registerFunctions(table, funcs) {
    funcs.forEach(f => this.registerFunction(table, f));
  }

  registerFunction(table, func) {
    this.register.push({ table: table, func: func });
  }

  processSnapshot() {
    const tables = this.snapshot.listTables();

    Object.keys(tables).forEach(table => {
      const functionsForThisTable = this.register
        .filter(r => r.table == table)
        .map(r => r.func);

      tables[table].forEach(record => {
        functionsForThisTable.forEach(f => {
          const commands = f(record, this.snapshot);
          this.pushCommands(commands);
        });
      });
    });
  }

  pushCommands(commands) {
    if (commands) {
      const newCommands = Array.isArray(commands) ? commands : [commands];
      newCommands.forEach(c => this.pushCommand(c));
    }
  }

  pushCommand(newCommand) {
    if (newCommand.type == 'create') {
      this.commands.push(newCommand);
    } else if (newCommand.type == 'update') {
      const oldCommand = this.commands.find(
        c => c.type == newCommand.type && c.id === newCommand.id
      );
      if (!oldCommand) {
        this.commands.push(newCommand);
      } else {
        Object.keys(newCommand.entries).forEach(k => {
          oldCommand.entries[k] = newCommand[k];
        });
      }
    }
  }

  async runCommand(command) {
    if (command.type == 'create') {
      await create(command.table, command.entries);
    } else {
      await update(command.table, command.id, command.entries);
    }

    const { type, tag, table, entries } = command;
    await log(`${type}d "${tag}" in ${table} with ${JSON.stringify(entries)}`);
  }

  async run() {
    this.processSnapshot();

    if (this.commands.length > 0) {
      const promises = this.commands.map(c => this.runCommand(c));
      await Promise.all(promises);
      await log(`updated and created ${this.commands.length} record(s)`);
    } else {
      await log('nothing to update for now');
    }
  }
}
