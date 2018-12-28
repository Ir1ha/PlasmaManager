// import { PlasmaTransaction, PlasmaTransactionWithSignature, TxTypeSplit, TxTypeMerge, TransactionInput, TransactionOutput, Block } from '@thematter_io/plasma.js';
// import { BN } from 'bn.js';
const plasma = require('@thematter_io/plasma.js');
const ethUtil = require('ethereumjs-util');
const fetch = require('node-fetch');
const PlasmaURLs = require('./PlasmaURLs.js');
// const FileReader = require('filereader')

class PlasmaService {
  constructor () {
    this.state = {
      transferAddressTo: '',
      utxos: []
    };
  }
  /// Getting list of available UTXOs for the Ethereum address.
  /// - Parameters:
  ///   - address: Ethereum address from which UTXOs are collected.
  ///   - onTestnet: Bool flag for possible endpoints:
  ///     1. True for Rinkeby testnet;
  ///     2. False for Mainnet.
  /// - Returns: PlasmaUTXOs array.

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
        // console.log(data);
        if (data.utxos.length > 0) {
          // console.log('->', data.utxos.length);
          return data;
          // Добавить преобразование из json -> utxo
        } else {
          // console.log('UTXO list is clear:', data.utxos.length);
          return data;
        }
      } catch (err) {
        console.log('JSON decode error:', err);
      }
    } catch (err) {
      console.log('Request error:', err);
    }
  }

  /// Getting Plasma Block by its number.
  /// - Parameters:
  ///   - onTestnet: Bool flag for possible endpoints:
  ///     1. True for Rinkeby testnet;
  ///     2. False for Mainnet.
  ///   - number: the number of Block.
  /// - Returns: the Data of Block.

  static async getBlock (number, onTestnet) {
    let url = onTestnet ? PlasmaURLs.blockStorageTestnet : PlasmaURLs.blockStorageMainnet;
    let num = number.toString();
    url += num;
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/octet-stream'
        },
        mode: 'cors'
      });
      if (response.status !== 200) {
        const r = 'error loading transactions';
        throw r;
      }
      try {
        const data = await response.arrayBuffer();
        // console.log(data);
        const blockBuffer = Buffer.from(data);
        const block = new plasma.Block(blockBuffer);
        // console.log(block);
        return block;
      } catch (err) {
        console.log('Blob decode error:', err);
      }
    } catch (err) {
      console.log('Request error');
    }
  }

  /// Sending transaction in Plasma.
  /// - Parameters:
  ///   - transaction: signed transaction that needs to be sent.
  ///   - onTestnet: Bool flag for possible endpoints:
  ///     1. True for Rinkeby testnet;
  ///     2. False for Mainnet.
  /// - Returns: the Bool flag: true if transaction is sent.

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
            return true;
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

module.exports = PlasmaService;

// PlasmaService.getBlock(1, true).then(val => console.log(val));
