//imports
const { ethers, run, network } = require('hardhat')
require('dotenv').config()

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract...')
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed at: ${simpleStorage.address}`)

  //check if we are deploying to a testnet or local network
  //to do the verification
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log(
      'Waiting for block confirmations in order to verify... Please wait...'
    )
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
    console.log(`The API of etherscan is: ${process.env.ETHERSCAN_API_KEY}`)
  }

  //interact with the contract

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is: ${currentValue}`)

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is: ${updatedValue}`)
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!')
    } else {
      console.log(e)
    }
  }
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
