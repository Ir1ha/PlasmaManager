const Tx = require('../PlasmaJsLib/PlasmaService/PlasmaTransaction.js');

class TestHelper {
  static get EthAddress () {
    return `f8ff4e3dc7b5c627930a29cc962e190c1fd7b392a89736f3bd3d070f49e662b1`;
  }
  static get privateKey () {
    return `BDBA6C3D375A8454993C247E2A11D3E81C9A2CE9911FF05AC7FF0FCCBAC554B5`;
  }
  static get sigTx () {
    let transactionType = '';
    let transactionNumber = 1;
    let inputs = [];
    let outputs = [];
    return Tx.createTransaction(transactionType, transactionNumber, inputs, outputs, this.privateKey);
  }
}

module.exports = TestHelper;
