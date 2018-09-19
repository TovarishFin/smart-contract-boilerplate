const { waitForEvent } = require('./general')

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
  testTransfer
}
