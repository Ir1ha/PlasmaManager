const mocha = require('mocha');
const PlasmaService = require('../PlasmaJsLib/PlasmaService/PlasmaService.js');
const TestHelper = require('./TestHelper.js');

mocha.describe('GetUTXOs', () => {
  mocha.it('Get UTXO list should return no error', function (done) {
    const expectedResult = false;
    PlasmaService.getUTXO(TestHelper.EthAddress, true).then(function (val) {
      if (val.error !== expectedResult) {
        throw new Error(`Expected ${expectedResult}, but got ${val.error}`);
      }
      done();
    });
  });

/*
mocha.it('Get UTXO list should return not empty list', function (done) {
  const unexpectedResult = 0;
  let result = 0;
  PlasmaService.getUTXO(TestHelper.EthAddress, true).then(function (val) {
    if (val.utxos.length === unexpectedResult) {
      throw new Error(`This address has UTXOs, but got ${val.utxos.length}`);
    }
    done();
  });
});
*/
});

mocha.describe('GetBlock', () => {
  mocha.it('Get Block should return not empty block', function (done) {
    const expectedResult = 315;
    PlasmaService.getBlock(1, true).then(function (val) {
      if (!val) {
        throw new Error(`Expected block, but got empty`);
      }
      done();
    });
  });
});

mocha.describe('SendRawTx', () => {
  mocha.it('SendRawTx should return true', function (done) {
    const expectedResult = 315;
    PlasmaService.sendRawTx(TestHelper.sigTx, true).then(function (val) {
      if (!val) {
        throw new Error(`Expected true, but got false`);
      }
      done();
    });
  });
});
