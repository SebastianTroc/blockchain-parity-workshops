const fetch = require('isomorphic-fetch')

const PARITY_URI = 'http://localhost:8545/'

const getLatestBlocks = async (blocksNumber = 1) => {
  if (blocksNumber < 1) {
    throw new Error('You cannot to take less than one block!')
  }

  const blocks = []
  const firstBlockHash = 'latest'
  const getMethodForBlock = (block) => {
    return block === firstBlockHash // isLatest?
      ? 'eth_getBlockByNumber'
      : 'eth_getBlockByHash'
  }

  let blockHashToFetch = firstBlockHash

  for (let i = 0; i < blocksNumber; i++) {
    const block = await requestNetwork({
      method: getMethodForBlock(blockHashToFetch),
      params: [blockHashToFetch, true]
    })
    blockHashToFetch = block.parentHash
    blocks.push(block)
  }

  return blocks
}

const requestNetwork = async ({ method, params }) => {
  const res = await fetch(PARITY_URI, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params
    })
  })

  const json = await res.json()
  return json.result
}

const getTimeFromTimestampHex = (timestampHex) => {
  const time = parseInt(timestampHex.substr(2), 16) // parse hex
  return new Date(time * 1000)
}

const printBlockData = (block) => {
  const { number, hash, transactions, timestamp, parentHash } = block
  const time = getTimeFromTimestampHex(timestamp)
  console.log(`
Block hash: ${hash}
Block number: ${number}
Parent hash: ${parentHash}
Number of transactions: ${transactions.length}
Block date: ${time}
`)
}

run()

async function run () {
  const response = await getLatestBlocks(3)
  console.log('Blocks number', response.length)

  response.forEach(printBlockData)
}
