# Lesson 6 in Patrick's course

In this lesson Patrick explains the hardhat framework. Some take aways:

- The `hardhat.config.js` is the entry point file to configure hardhat. It is in the name after all
- You can create your own tasks in hardhat, so you can run `yarn hardhat yourTask`
- There are a lot of nice plugin to add like, the gas reporter, solidity coverage and the hardhat-etherscan to verify your contract programatically. You need API keys to do some stuff with the plugins but overall, really cool plugins
- The use of the chai library to write test for smart contracts
- To run the deploy script: `yarn run scripts-deploy.js --network rinkeby`. I still cant remember that one

Some commands to use in hardhat:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
