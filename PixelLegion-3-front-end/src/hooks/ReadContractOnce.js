import { useContractCall } from "@usedapp/core"

export const ReadContractOnce = (address, abi, method, args) => {
    const result = useContractCall({
        abi: abi,
        address: address,
        method: method,
        args: args,
    })
    return result
}
