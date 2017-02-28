const ohm = require('.../node_modules/ohm-js');
const fs = require('fs');

const contents = fs.readFileSync('skrt.ohm');
const myGrammar = ohm.grammar(contents);

const userInput = 'def x = 5;';
const m = myGrammar.match(userInput);
if (m.succeeded()) {
  console.log('Greetings, human.');
} else {
  console.log("That's not a greeting!");
}
