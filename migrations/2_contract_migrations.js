const Example = artifacts.require('./Example.sol')
const { BN } = web3.utils
module.exports = async deployer => {
  await deployer.deploy(Example, 'ExampleToken', 'EXT', 18, new BN('100e18'))
}
