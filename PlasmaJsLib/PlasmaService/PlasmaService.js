// import { PlasmaTransaction, PlasmaTransactionWithSignature, TxTypeSplit, TxTypeMerge, TransactionInput, TransactionOutput, Block } from '@thematter_io/plasma.js';
// import { BN } from 'bn.js';
const plasma = require('@thematter_io/plasma.js');
const ethUtil = require('ethereumjs-util')
const fetch = require('node-fetch');
const PlasmaURLs = require('./PlasmaURLs.js');

class PlasmaService {
  static async getUTXO (address, onTestnet) {
    let url = onTestnet ? PlasmaURLs.listUTXOsTestnet : PlasmaURLs.listUTXOsMainnet;
    let payload = {
      'for': `${address}`,
      'blockNumber': 1,
      'transactionNumber': 0,
      'outputNumber': 0,
      'limit': 50
    };
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(payload)
      });

      if (response.status !== 200) {
        const r = 'error loading transactions';
        throw r;
      }
      try {
        let data = await response.json();
        console.log(data);
        if (data.utxos.length > 0) {
          console.log('->', data.utxos.length);
          // Добавить преобразование из json -> utxo
        } else {
          console.log('skipping:', data.utxos.length);
        }
      } catch (err) {
        console.log('JSON decode error:', err);
      }
    } catch (err) {
      console.log('Request error:', err);
    }
  }

  static async getBlock (number, onTestnet) {
    let url = onTestnet ? PlasmaURLs.blockStorageTestnet : PlasmaURLs.blockStorageMainnet;
    let num = number.toString();
    url += num;
    try {
      let response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      if (response.status !== 200) {
        const r = 'error loading transactions';
        throw r;
      }
      try {
        let data = await response.blob();
        console.log(data);
      } catch (err) {
        console.log('JSON decode error:', err);
      }
    } catch (err) {
      console.log('Request error');
    }
  }

  static async sendRawTx (signedTransaction, onTestnet) {
    let url = onTestnet ? PlasmaURLs.sendRawTXTestnet : PlasmaURLs.sendRawTXMainnet;
    const serialized = signedTransaction.transaction.serialize();
    const txHex = ethUtil.bufferToHex(serialized);
    let payload = {
      tx: txHex
    }
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(payload)
      });
      if (response.status !== 200) {
        const r = 'error loading transactions';
        throw r;
      }
      try {
        response.json().then(async function (data) {
          if (data.error) {
            throw data.reason;
          } else {
            console.log('Done');
          }
        });
      } catch (err) {
        console.log('JSON decode error:', err);
      }
    } catch (err) {
      console.log('Request error');
    }
  }
}

let fAddress = 'f8ff4e3dc7b5c627930a29cc962e190c1fd7b392a89736f3bd3d070f49e662b1';
let test = PlasmaService.getUTXO(fAddress, true);
let test1 = PlasmaService.getBlock(1, true);
