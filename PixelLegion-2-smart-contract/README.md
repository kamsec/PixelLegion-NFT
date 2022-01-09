
This folder contains source code of smart contract in Solidity and Python (Brownie) scripts for deploying it on blockchain.

### 2. Smart contract
For this part we assume to be in `/PixelLegion-2-smart-contract/` folder.
1. Create your ERC-721 (or ERC-1155) smart contract. There are numerous tutorials for Solidity and NFT contracts, I recommend:
    - https://www.youtube.com/watch?v=M576WGiDBdQ
    - https://www.youtube.com/watch?v=p36tXHX1JD8
    - IMO you can skip parts about VRFs (Verifiable Random Functions) because it's an overkill for simple NFT projects (complicates stuff a lot, requires paid LINK tokens, and I haven't seen any NFT projects actually using it)
    
2. If you already went through some tutorials you can find source code of my smart contract at `contracts/PixelLegionMarket.sol`, I deployed it using the following steps:
    - Install <a href="https://eth-brownie.readthedocs.io/en/stable/">Brownie</a> for easy deployment.
    - Use `solc` for Solidity compilation.
    - Create `.env` file with the following content:
        ```
        PRIVATE_KEY=***
        POLYGONSCAN_TOKEN=***
        ```
        Replace `***` for PRIVATE_KEY variable with private key of account for deploying contracts for example exported from metamask.
        Replace the second `***` with your api token from polygonscan (for contract source code publishing). At this time same api key works both for Mumbai and Polygon mainnet.
    - Add Mumbai testnet network for testing and deploy at Polygon blockchain for lowest fees.
    - You can deploy the contract with
        ```
        brownie run scripts/deploy.py --network polygon-mainnet
        ```
    - If source code publishing encounters some error, you can always try again with `scripts/publish_source.py`
    - Note that this contract allows to place and accept the offers on the blockchain, without participation of third party. However, OpenSea doesn't track custom function executions, so volume traded "on chain" using this functionality is not counted as volume traded displayed on OpenSea. This means that OpenSea only counts volume traded caused by using their website for trading (which means using their smart contracts under the hood), which basically kills the idea of decentraliztion.
    