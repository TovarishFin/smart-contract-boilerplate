const HDWalletProvider = require('truffle-hdwallet-provider')

require('dotenv').config()
const testnetMnemonic = process.env.TESTNET_MNEMONIC
const mainnetMnemonic = process.env.MAINNET_MNEMONIC

module.exports = {
  networks: {
    test: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 6.5e6,
      gasPrice: 5e9,
      websockets: true
    },
    ropsten: {
      network_id: 3,
      gas: 6.5e6,
      gasPrice: 5e9,
      provider: () =>
        new HDWalletProvider(testnetMnemonic, 'https://ropsten.infura.io')
    },
    kovan: {
      network_id: 42,
      gas: 6.5e6,
      gasPrice: 5e9,
      provider: () =>
        new HDWalletProvider(testnetMnemonic, 'https://kovan.infura.io')
    },
    rinkeby: {
      network_id: 4,
      gas: 6.5e6,
      gasPrice: 5e9,
      provider: () =>
        new HDWalletProvider(testnetMnemonic, 'https://rinkeby.infura.io')
    },
    live: {
      network_id: 1,
      gas: 6.5e6,
      gasPrice: 5e9,
      provider: () =>
        new HDWalletProvider(mainnetMnemonic, 'https://mainnet.infura.io')
    }
  },
  mocha: {
    reporter: process.env.GAS_REPORTER ? 'eth-gas-reporter' : 'spec'
  }
}
