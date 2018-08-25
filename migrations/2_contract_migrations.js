const ExampleCoin = artifacts.require('./ExampleCoin.sol')
const { BN } = web3.utils
module.exports = async deployer => {
  await deployer.deploy(
    ExampleCoin,
    'ExampleToken',
    'EXT',
    18,
    new BN('100e18')
  )
}
