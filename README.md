# TovarishFin's Smart Contract Boilerplate
This is a very opinionated set of boilerplate code which includes:
* smart contract linting (using solium)
  * config can be found in `.soliumrc.json` & `.soliumignore`
* js linting (eslint/prettier)
  * eslint config can be found in `.eslintrc.js` & `.eslintignore`
  * prettier config can be found in `.prettierrc` & `.prettierignore`
* commonly used test helper functions (more to come later perhaps...)
  * these can be found in `test/helpers/general.js`
* truffle config using `truffle-hdwallet-provider`
  * configs for **kovan**, **rinkeby**, **ropsten**, and **mainnet** included
  * also includes config for `eth-gas-reporter`
* yarn scripts for testing, migration, and other useful things
* an example smart contract along with tests and a correlating test helper file
  * test contract is `Example.sol` in `/contracts`
  * contract test file is `Example.js` in `/test`
  * test helper file is `exc.js` in `/test/helpers`
* `.gitattributes` file for indicating solidity code in github
* OpenZeppelin contracts preinstalled
* gas reporting option when testing

## Important Notes
This boilerplate uses the latest [truffle (v5.0.0-beta.0 – Chocolate Sushi)](https://github.com/trufflesuite/truffle/releases/tag/v5.0.0-beta.0)!

This means that there are some significant differences which need to be considered when using this boilerplate. The most notable is the use of web3 version v1.0!

Due to the use of web3 v1.0, events need to be used through websockets which means that ganache-cli must be used (this may not be true... PRs are welcome!). Use `yarn start:blockchain` to use start ganache-cli before testing.

With the new version of web3 also comes a new big number library, `bn.js` (rather than `bignumber.js`)

This boilerplate uses yarn rather than npm. Change fork and change this locally if you want...

## Installing Dependencies
Everything can be installed through yarn.
`yarn`

## Using with your Code editor
For the best experience, make sure to install the following packages for the editor you are using:
* solium/solidity syntax
* eslint
* prettier

In Visual Studio Code this is:
* [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)


## Testing
First start the local blockchain:
```
yarn start:blockchain
```

Then start the tests:
```
yarn test
```

### Testing with Gas Reporting
First start the local blockchain:
```
yarn start:blockchain
```

Then start the tests:
```
yarn test:gas-reporter
```

You will get a nice summary table at the end of testing indicating gas costs of deployment and state changing functions:
```
·----------------------------------------------------------------|----------------------------·
|                              Gas                               ·  Block limit: 6721975 gas  │
·································································|·····························
|  Methods                                                                                    │
················|····················|·······|·······|···········|··············|··············
|  Contract     ·  Method            ·  Min  ·  Max  ·  Avg      ·  # calls     ·  eur (avg)  │
················|····················|·······|·······|···········|··············|··············
|  ExampleCoin  ·  approve           ·    -  ·    -  ·        -  ·           0  ·          -  │
················|····················|·······|·······|···········|··············|··············
|  ExampleCoin  ·  decreaseApproval  ·    -  ·    -  ·        -  ·           0  ·          -  │
················|····················|·······|·······|···········|··············|··············
|  ExampleCoin  ·  increaseApproval  ·    -  ·    -  ·        -  ·           0  ·          -  │
················|····················|·······|·······|···········|··············|··············
|  ExampleCoin  ·  transfer          ·    -  ·    -  ·    51867  ·           1  ·          -  │
················|····················|·······|·······|···········|··············|··············
|  ExampleCoin  ·  transferFrom      ·    -  ·    -  ·        -  ·           0  ·          -  │
················|····················|·······|·······|···········|··············|··············
|  Deployments                       ·                           ·  % of limit  ·             │
·····································|·······|·······|···········|··············|··············
|  ExampleCoin                       ·    -  ·    -  ·  1480604  ·        22 %  ·          -  │
·------------------------------------|-------|-------|-----------|--------------|-------------·
```

## Deploying Contracts
The migrations files are setup to use `async/await` in order to make extending the migrations into something more complicated quite simple. The new version of truffle has updated the way it handles migrations so this is less problematic now.

The boilerplate comes with `truffle-hdwallet-provider` already setup. You just need to set a mnemonic in your .env file (not included. See .env.example for an example). All of the testnet deployments use the same mnemonic. Mainnet uses a different one.

After you have set a mnemonic, you can use the appropriate script in `package.json`:

### Kovan Deployment
```
yarn migrate:kovan
```

### Ropsten Deployment
```
yarn migrate:ropsten
```

### Rinkeby Deployment
```
yarn migrate:rinkeby
```

### Mainnet Deployment
```
yarn migrate:mainnet
```

## Extending for your Project
Fork this repo and do whatever you want with it :)
For information on how to fork see: https://help.github.com/articles/fork-a-repo/

## Improving this Repo
If you have some helper functions that you find extremely useful please feel free to open up a PR.

## Issues
Feel free to open up an issue if you find a problem. I cannot guarantee that I will be keeping this repo super up to date... however, I do use this repo for nearly any new projects I work on... so improvements and maintenance are likely.

## Legal
This code is given as is, the author is not responsible for any existing bugs. Code is to be used at your own risk. The author is not liable for any damages, monetary or otherwise.