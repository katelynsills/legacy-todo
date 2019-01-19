/* global require process */
// legacy

// run from command line
// takes an argument
// saves it to file, appending it
// displays data, highlighing high, medium, and low priority tasks

const fs = require('fs');
const parseArgs = require('minimist');
const chalk = require('chalk');
const readline = require('readline');

const todoFile = 'todo.txt';

const addTodoToFile = (todo, priority = 'Medium') => {
  fs.appendFile(todoFile, `${priority}: ${todo} \n`, err => {
    if (err) throw err;
    console.log('Todo was added');
  });
};

const addTodo = args => {
  const { todo, priority } = args;
  addTodoToFile(todo, priority);
};

const highlightTodo = todoLine => {
  const [priority, todo] = todoLine.split(': ');
  switch (priority) {
    case 'High': {
      return chalk.red(todo);
    }
    case 'Medium': {
      return chalk.yellow(todo);
    }
    case 'Low': {
      return chalk.green(todo);
    }
    default: {
      throw new Error(`unrecognized priority ${priority}`);
    }
  }
};

const displayTodos = () => {
  try {
    console.log(chalk.greenBright("****** TODAY'S TODOS ********"));
    const stream = fs.createReadStream(todoFile);
    const lineReader = readline.createInterface({
      input: stream,
    });
    lineReader.on('line', line => {
      console.log(highlightTodo(line));
    });
  } catch (err) {
    if (err.includes('ENOENT')) {
      console.log('Nothing to display. Please add a todo first');
    }
  }
};

/* we expect {
    _: [],
    'add'|'display': true,
    todo: todoText,
    priority:'Low'|'Medium'|'High'
}
todo is required if run is 'add', and priority defaults to Medium
*/

const args = parseArgs(process.argv.slice(2));
if (args.add) {
  addTodo(args);
} else if (args.display) {
  displayTodos();
} else {
  console.log('ERROR: not a valid command;');
}
