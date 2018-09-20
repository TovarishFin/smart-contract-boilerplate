const ExampleCoin = artifacts.require('./ExampleCoin.sol')
const BN = require('bn.js')
const { assertRevert, decimals18 } = require('./helpers/general')
const { testTransfer } = require('./helpers/exc')

describe('when deploying ExampleCoin', () => {
  contract('ExampleCoin', accounts => {
    const name = 'ExampleCoin'
    const symbol = 'EXC'
    const decimals = new BN(18)
    const totalSupply = new BN(100).mul(decimals18)
    const transferAmount = new BN(1).mul(decimals18)
    const owner = accounts[0]

    let exc

    before('setup contracts', async () => {
      exc = await ExampleCoin.new(name, symbol, decimals, totalSupply, {
        from: owner
      })
    })

    it('should start with the correct values', async () => {
      const actualName = await exc.name()
      const actualSymbol = await exc.symbol()
      const actualDecimals = await exc.decimals()
      const actualTotalSupply = await exc.totalSupply()

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
        testTransfer(exc, accounts[2], transferAmount, {
          from: accounts[1]
        })
      )
    })

    it('should transfer tokens as owner', async () => {
      await testTransfer(exc, accounts[1], transferAmount, {
        from: owner
      })
    })
  })
})
