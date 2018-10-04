const ExampleCoin = artifacts.require('./ExampleCoin.sol')
const { waitForEvent, owner, decimals18 } = require('./general')
const { BN } = web3.utils

const defaultName = 'ExampleCoin'
const defaultSymbol = 'EXC'
const defaultDecimals = new BN(18)
const defaultTotalSupply = new BN(100).mul(decimals18)

const setupContract = async () => {
  const exc = ExampleCoin.new(
    defaultName,
    defaultSymbol,
    defaultDecimals,
    defaultTotalSupply,
    {
      from: owner
    }
  )

  return { exc }
}

const testInitialization = async exc => {
  const name = await exc.name()
  const symbol = await exc.symbol()
  const decimals = await exc.decimals()
  const totalSupply = await exc.totalSupply()

  assert.equal(name, defaultName, 'name should match name given in constructor')
  assert.equal(
    symbol,
    defaultSymbol,
    'symbol should match symbol given in constructor'
  )
  assert.equal(
    decimals.toString(),
    defaultDecimals.toString(),
    'decimals should match decimals given in constructor'
  )
  assert.equal(
    totalSupply.toString(),
    defaultTotalSupply.toString(),
    'totalSupply should match totalSupply given in constructor'
  )
}

const testTransfer = async (exc, to, amount, config) => {
  assert(config.from, 'config must have a from address!')
  const { from } = config
  const preSenderBalance = await exc.balanceOf(from)
  const preReceiverBalance = await exc.balanceOf(to)

  const expectedEvent = waitForEvent(exc, 'Transfer')

  await exc.transfer(to, amount, config)

  const transferEvent = await expectedEvent
  const {
    from: eventFrom,
    to: eventTo,
    value: eventValue
  } = transferEvent.returnValues

  const postSenderBalance = await exc.balanceOf(from)
  const postReceiverBalance = await exc.balanceOf(to)

  assert.equal(
    preSenderBalance.sub(postSenderBalance).toString(),
    amount.toString(),
    'sender token balane should be decremented by amount'
  )
  assert.equal(
    postReceiverBalance.sub(preReceiverBalance).toString(),
    amount.toString(),
    'receiver balance should be incremented by amount'
  )
  assert.equal(eventFrom, from, 'eventFrom should match from')
  assert.equal(eventTo, to, 'eventTo should match to')
  assert.equal(
    eventValue.toString(),
    amount.toString(),
    'eventValue should match amount'
  )
}

module.exports = {
  setupContract,
  testInitialization,
  testTransfer
}
