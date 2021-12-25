
import { useEthers } from "@usedapp/core"
import { ChainId, CHAIN_NAMES } from "@usedapp/core"
import { utils } from "ethers"
// this file comes from 2-smart-contract from build directory
import PixelLegionMarket from "../chain-info/PixelLegionMarket.json"
import config from "../config.json"


export const GetConnectConstants = () => {
    // metamask
    const { account, chainId } = useEthers()
    //chainId is current chain selected by account, ChainID is dict of all chains
    const networkName= chainId in ChainId ? CHAIN_NAMES[chainId] : "Unknown chainId"
    const isConnected= ((account !== undefined) && (account !== null))
    const isCorrectChain= ((config["deploymentChainId"] === chainId) && isConnected ) // added && isConnected because useDapp is shit
    
    // contract
    const contractAddress = config["contract"]
    const { abi } = PixelLegionMarket
    const contractInterface = new utils.Interface(abi)

    return {account,
            chainId,
            networkName,
            isConnected,
            isCorrectChain,
            contractAddress,
            abi,
            contractInterface
        }
}
