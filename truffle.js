module.exports = {
  networks: {
    ropsten: {
      host: 'localhost',
      port: 8545,
      network_id: 3,
      gas: 45e5,
      gasPrice: 30e9
    },
    kovan: {
      host: 'localhost',
      port: 8545,
      network_id: 42,
      gas: 45e5,
      gasPrice: 20e9
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      network_id: 4,
      gas: 45e5,
      gasPrice: 20e9
    }
  }
}
