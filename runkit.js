let parseMs = require('ms-util');
let millis = 86407049;

console.dir(parseMs.parse(millis));
console.dir(parseMs.toWords(millis));
console.dir(parseMs.colonSeparated(millis));