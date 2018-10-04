const BN = require('bn.js')
const { assertRevert, decimals18, owner } = require('./helpers/general')
const {
  setupContract,
  testTransfer,
  testInitialization
} = require('./helpers/exc')

describe('when deploying ExampleCoin', () => {
  contract('ExampleCoin', () => {
    const transferAmount = new BN(1).mul(decimals18)
    let exc

    before('setup contracts', async () => {
      exc = await setupContract()
    })

    it('should start with the correct values', async () => {
      await testInitialization(exc)
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
