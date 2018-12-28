const assert = require('assert');
const { getUTXOlist } = require('../old/functions/getUTXOlist');

async function main () {
  const list = await getUTXOlist(aliceAddress, '127.0.0.1:3001');
  assert(list.utxos.length === 1);
  const a = 4;
  console.log(a);
}

console.log('hi');
console.log('ok');
