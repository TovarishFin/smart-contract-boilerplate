const assert = require('assert')
const { BN } = web3.utils

const testWillThrow = async (fn, args) => {
  try {
    await fn(...args)
    assert(false, 'the contract should throw here')
  } catch (error) {
    assert(
      /invalid opcode|revert/.test(error),
      `the error message should be invalid opcode, the error was ${error}`
    )
  }
}

const testContractDestroyed = async (fn, args) => {
  try {
    await fn(...args)
    assert(false, 'the contract should throw here')
  } catch (error) {
    assert(
      /not a contract address/.test(error),
      `the error message should contain no contract, the error was ${error}`
    )
  }
}

const getEtherBalance = address => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, res) => {
      if (err) reject(err)

      resolve(res)
    })
  })
}

const getTxInfo = txHash => {
  if (typeof txHash === 'object') {
    return txHash.receipt
  }

  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(txHash, (err, res) => {
      if (err) {
        reject(err)
      }

      resolve(res)
    })
  })
}

const sendTransaction = args => {
  return new Promise(function(resolve, reject) {
    web3.eth.sendTransaction(args, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

const addressZero = `0x${'0'.repeat(40)}`

const gasPrice = new BN(30e9)

const bigZero = new BN(0)

module.exports = {
  testWillThrow,
  testContractDestroyed,
  getEtherBalance,
  getTxInfo,
  addressZero,
  sendTransaction,
  gasPrice,
  bigZero
}
