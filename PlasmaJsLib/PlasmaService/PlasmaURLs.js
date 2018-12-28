class PlasmaURLs {
  // Used to get list of UTXOs for specific address on Mainnet
  static get listUTXOsMainnet () {
    return `https://plasma.thematter.io/api/v1/listUTXOs`;
  }
  // Used to get list of UTXOs for specific address on Rinkeby
  static get listUTXOsTestnet () {
    return `https://plasma-testnet.thematter.io/api/v1/listUTXOs`;
  }
  // Used to send transaction in Plasma on Mainnet
  static get sendRawTXMainnet () {
    return `https://plasma.thematter.io/api/v1/sendRawTX`;
  }
  // Used to send transaction in Plasma on Rinkeby
  static get sendRawTXTestnet () {
    return `https://plasma-testnet.thematter.io/api/v1/sendRawTX`;
  }
  // Used to get block with set number on Mainnet
  static get blockStorageMainnet () {
    return `https://plasma.ams3.digitaloceanspaces.com/plasma/`;
  }
  // Used to get block with set number on Rinkeby
  static get blockStorageTestnet () {
    return `https://plasma-testnet.ams3.digitaloceanspaces.com/plasma/`;
  }
}

module.exports = PlasmaURLs;
