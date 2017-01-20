let parseMs = require('ms-util');
let millis = 86407049;

console.log(parseMs.parse(millis));
console.log(parseMs.toWords(millis));
console.log(parseMs.colonSeparated(millis));