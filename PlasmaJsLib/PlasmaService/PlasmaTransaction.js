const plasma = require('@thematter_io/plasma.js');
const ethUtil = require('ethereumjs-util');
const BN = ethUtil.BN;

class Tx {
  static createInput (utxo) {
    const inp = new plasma.TransactionInput({
      blockNumber: (new BN(utxo.blockNumber)).toArrayLike(Buffer, 'be', 4),
      txNumberInBlock: (new BN(utxo.transactionNumber)).toArrayLike(Buffer, 'be', 4),
      outputNumberInTransaction: (new BN(utxo.outputNumber)).toArrayLike(Buffer, 'be', 1),
      amountBuffer: (new BN(utxo.value)).toArrayLike(Buffer, 'be', 32)
    });
    return inp;
  }

  static createTransaction (transactionType, transactionNumber, inputs, outputs, privateKey) {
    const allInputs = [];
    const allOutputs = [];

    for (const input of inputs) {
      const inp = new plasma.TransactionInput({
        blockNumber: (new BN(input.blockNumber)).toBuffer('be', 4),
        txNumberInBlock: (new BN(input.txNumberInBlock)).toBuffer('be', 4),
        outputNumberInTransaction: (new BN(input.outputNumberInTransaction)).toBuffer('be', 1),
        amountBuffer: (new BN(input.amount)).toBuffer('be', 32)
      });
      allInputs.push(inp);
    }
    let outputCounter = 0;
    for (const output of outputs) {
      const out = new plasma.TransactionOutput({
        outputNum: (new BN(outputCounter)).toBuffer('be', 1),
        amountBuffer: (new BN(output.amount)).toBuffer('be', 32),
        to: ethUtil.toBuffer(output.to)
      });
      allOutputs.push(out);
      outputCounter++;
    }

    const plasmaTransaction = new plasma.PlasmaTransaction({
      transactionType: (new BN(transactionType)).toBuffer('be', 1),
      inputs: allInputs,
      outputs: allOutputs
    });

    return plasmaTransaction;
  }

  static createSignedTransaction (plasmaTransaction) {
    const sigTX = new plasma.PlasmaTransactionWithSignature({
      transaction: plasmaTransaction
    });
    return sigTX;
  }
}

module.exports = Tx;
