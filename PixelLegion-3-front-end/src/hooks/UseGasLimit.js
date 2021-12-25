import { useBlockNumber, useEthers } from  "@usedapp/core"
import { useEffect, useState } from 'react'

export function UseGasLimit() {
  const { library } = useEthers()
  const blockNumber = useBlockNumber()
  const [gasLimit, setGasLimit] = useState(undefined)

  useEffect(() => {
    async function updateGasLimit() {
      setGasLimit((await library?.getBlock())?.gasLimit)
      /*
      used to check gasLimit
      on mumbai "mint" function consumes ~252,026 gas on mainnet like 155,194
      GasLimit checked by this function comes from current block and it is upper bound that can be consumed
      it turns out that it's 20,000,000
      if set GasLimit in WriteContract to 20,000,000, the same amounts are consumed as before (around 250k)
      so it changes nothing, but needs to be set to some number above 250,000 because without that
      transactions sometimes fail
      so ive set it as constant 500,000 and not using UseGasLimit anymore
      */
    }
    updateGasLimit()
  }, [library, blockNumber])

  return gasLimit
}
