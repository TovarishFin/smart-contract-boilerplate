const Example = artifacts.require('./Example.sol')
const BigNumber = require('bignumber.js')

module.exports = deployer => {
  deployer.deploy(Example, 'ExampleToken', 'EXT', 18, new BigNumber('100e18'))
}
