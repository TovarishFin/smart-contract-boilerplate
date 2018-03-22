const Example = artifacts.require('./Example.sol')

module.exports = deployer => {
  deployer.deploy(Example)
}
