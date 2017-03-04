const ohm = require('../node_modules/ohm-js');
const fs = require('fs');

const contents = fs.readFileSync(process.argv[2]);

const match = ohm.grammar(contents);

if (match.succeeded()) { console.log(semantics(match).tree().toString()); }
