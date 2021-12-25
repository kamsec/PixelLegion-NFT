
import { useContractFunction } from "@usedapp/core"
import { Contract } from "@ethersproject/contracts"


export const WriteContract = (address, abi, method, value, gasPrice) => {
    const myContract = new Contract(address, abi)
    
    const {send: txSend, state: txState, events: txEvents} = useContractFunction(myContract, method)

    const tx = () => {
        return txSend({value: value, gasPrice: gasPrice, gasLimit:  "500000"}) //check ./UseGasLimit.js for explanation why 500000
    }

    return {tx, txState, txEvents}
}
