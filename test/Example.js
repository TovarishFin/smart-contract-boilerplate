const assert = require('assert')
const Example = artifacts.require('./Example.sol')
const { BN } = web3.utils

describe('when deploying Example', () => {
  contract('Example', () => {
    const name = 'ExampleCoin'
    const symbol = 'EXL'
    const decimals = new BN(18)
    const totalSupply = new BN('100e18')

    let exl

    before('setup contracts', async () => {
      exl = await Example.new(name, symbol, decimals, totalSupply)
    })

    it('should start with the correct values', async () => {
      const actualName = await exl.name()
      const actualSymbol = await exl.symbol()
      const actualDecimals = await exl.decimals()
      const actualTotalSupply = await exl.totalSupply()

      assert.equal(
        name,
        actualName,
        'actualName should match name given in constructor'
      )
      assert.equal(
        symbol,
        actualSymbol,
        'actualSymbol should match symbol given in constructor'
      )
      assert.equal(
        decimals.toString(),
        actualDecimals.toString(),
        'actualDecimals should match decimals given in constructor'
      )
      assert.equal(
        totalSupply.toString(),
        actualTotalSupply.toString(),
        'actualTotalSupply should match totalSupply given in constructor'
      )
    })
  })
})
