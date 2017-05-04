const argv = require('yargs')
  .usage('$0 [-a] [-o] [-i] filename')
  .boolean(['a', 'o', 'i'])
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .describe('o', 'do optimizations')
  .describe('i', 'generate and show the decorated abstract syntax tree then stop')
  .demand(1)
  .argv;

const fs = require('fs');
const util = require('util');
const parse = require('./parser');
require('./generator');

fs.readFile(argv._[0], 'utf-8', (err, text) => {
  if (err) {
    console.error(err);
    return;
  }
  let program = parse(text);
  if (argv.a) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }

  program.analyze();

  if (argv.o) {
    program = program.optimize();
  }


  if (argv.i) {
    console.log(util.inspect(program, { depth: null }));
  }

  program.gen();
});
