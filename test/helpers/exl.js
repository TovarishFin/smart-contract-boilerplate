const { waitForEvent } = require('./general')

const testTransfer = async (exl, to, amount, config) => {
  assert(config.from, 'config must have a from address!')
  const { from } = config
  const preSenderBalance = await exl.balanceOf(from)
  const preReceiverBalance = await exl.balanceOf(to)

  const expectedEvent = waitForEvent(exl, 'Transfer')

  await exl.transfer(to, amount, config)

  const transferEvent = await expectedEvent
  const {
    from: eventFrom,
    to: eventTo,
    value: eventValue
  } = transferEvent.returnValues

  const postSenderBalance = await exl.balanceOf(from)
  const postReceiverBalance = await exl.balanceOf(to)

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
