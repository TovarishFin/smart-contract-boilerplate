const ExampleCoin = artifacts.require('./ExampleCoin.sol')
const BN = require('bn.js')
const { assertRevert, decimals18 } = require('./helpers/general')
const { testTransfer } = require('./helpers/exl')

describe('when deploying ExampleCoin', () => {
  contract('ExampleCoin', accounts => {
    const name = 'ExampleCoin'
    const symbol = 'EXL'
    const decimals = new BN(18)
    const totalSupply = new BN(100).mul(decimals18)
    const transferAmount = new BN(1).mul(decimals18)
    const owner = accounts[0]

    let exl

    before('setup contracts', async () => {
      exl = await ExampleCoin.new(name, symbol, decimals, totalSupply, {
        from: owner
      })
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

    it('should not transfer tokens an account does not have', async () => {
      await assertRevert(
        testTransfer(exl, accounts[2], transferAmount, {
          from: accounts[1]
        })
      )
    })

    it('should transfer tokens as owner', async () => {
      await testTransfer(exl, accounts[1], transferAmount, {
        from: owner
      })
    })
  })
})
