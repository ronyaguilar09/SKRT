const fs = require('fs');

const contents = fs.readFileSync(process.argv[2]);
console.log(contents.toString());
