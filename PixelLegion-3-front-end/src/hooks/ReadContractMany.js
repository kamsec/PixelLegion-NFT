import { useContractCalls } from "@usedapp/core"

export const ReadContractMany = (calls) => {
    const result = useContractCalls(calls)
    return result
}
