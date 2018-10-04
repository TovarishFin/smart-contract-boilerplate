const ExampleCoin = artifacts.require('./ExampleCoin.sol')
const { BN } = web3.utils
module.exports = async (deployer, network, accounts) => {
  // we don't need to do a migration when testing... we handle that in tests
  if (network === 'test') {
    global.accounts = accounts
    return
  }

  await deployer.deploy(
    ExampleCoin,
    'ExampleToken',
    'EXT',
    18,
    new BN('100e18')
  )
}
