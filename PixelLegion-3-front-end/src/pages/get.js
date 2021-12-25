import { Typography, Button, CircularProgress, Box } from "@material-ui/core";
import { ReadContractOnce } from "../hooks/ReadContractOnce"
import { WriteContract } from "../hooks/WriteContract"
import { useEffect, useState } from "react"
import config from "../config.json"
import useStyles from '../utils/styles'
import Alert from '@material-ui/lab/Alert';
import { GetConnectConstants }  from '../hooks/GetConnectConstants'
import { useGasPrice } from "@usedapp/core"

function Get() {
  const classes = useStyles()
  const [mintedToken, setMintedToken] = useState(0);

  const { account, networkName, isConnected, isCorrectChain, contractAddress, contractInterface } = GetConnectConstants()

  const tokenLimit = parseInt(ReadContractOnce(contractAddress, contractInterface, "tokenLimit", []))
  const totalSupply = parseInt(ReadContractOnce(contractAddress, contractInterface, "totalSupply", []))
  const tokensLeft = tokenLimit - totalSupply

  var gasPrice = parseInt(useGasPrice())
  gasPrice = Math.round(gasPrice * 1.05)

  const claimPrice = parseInt(ReadContractOnce(contractAddress, contractInterface, "claimPrice", []))
  const claimPriceInMatic = claimPrice / 10 ** 18 // as displayed value only
  const {tx, txState, txEvents} = WriteContract(contractAddress, contractInterface, "mint", claimPrice.toString(), gasPrice.toString())

  const isMining = txState.status === "Mining"

  const handleMint = () => {
    return tx()
  }
  
  // sets minted token
  useEffect(() => {
    if (txEvents) {
      if (txEvents[1].name === "Assign") {
        setMintedToken(parseInt(txEvents[1].args[1]))
      }
    }
  }, [txEvents]) // it tracks this array, if anything in this array changes, it will start function in useEffect


  return (
    <>
      {(tokensLeft === 0 && !mintedToken) ? (  
        // && !mintedToken added to work properly when last token is minted
        <Box p={2} mt={2}>
          <div className={classes.centeredText}>
            All our NFTs have been minted!<br></br>
            You can still buy them from traders on OpenSea.<br></br><br></br>
            <a href={config["openseaCollectionUrl"]}>
              <Button variant="contained" color="secondary" style={{ borderRadius: "30px" }}>Trade on OpenSea</Button>
            </a>
          </div>
        </Box>
      ) : (
        <>
          {(isConnected && isCorrectChain) ? (
            <>
              <Box p={2} mt={2}>
                <Typography variant="h5" gutterBottom>Mint your own PixelLegion NFT! </Typography>
                <div className={ classes.centered } style={{textAlign: 'center'}}>
                  {mintedToken ? (
                    <Box>
                      <a href={`${config["openseaAssetUrl"]}/${mintedToken}`} className={classes.linkColor}>
                        <img src={`output_hashless/hashless_PixelLegion ${mintedToken}.png`} className={ classes.responsiveImage } alt="IMG" style={{ maxWidth: "350px"}}/>
                        <div style={{width: "350", height: "0px", display: "flex", justifyContent: "center"}}>
                            <span style={{position: "relative", top: "-30px"}}>PixelLegion #{mintedToken}</span>
                        </div>
                      </a>
    
                      <div className={ classes.centered } style={{marginBottom: "10px"}}>
                        <Alert mt={2} icon={false} severity="success" style={{ width: "350px", justifyContent: "center"}}>Successfully minted!</Alert>
                      </div>
                      {(tokensLeft === 0) ? (
                        <div className={ classes.centered }>
                          <Button disabled={true} variant="contained" className = { classes.responsiveImageShake } color="secondary"
                          style={{ minWidth: "150px", minHeight: "50px", borderRadius: "30px" }} onClick={handleMint}>
                            {isMining ? <CircularProgress size={26} /> : "All NFTs has been minted!"}
                          </Button>
                        </div>
                      ) : (
                        <div className={ classes.centered }>
                          <Button variant="contained" className = { classes.responsiveImageShake } color="secondary"
                          style={{ minWidth: "150px", minHeight: "50px", borderRadius: "30px" }} onClick={handleMint} disabled={isMining}>
                            {isMining ? <CircularProgress size={26} /> : "Mint next"}
                          </Button>
                        </div>
                      )}
                      
                    </Box>
                  ) : (
                    <Box>
                      <img src="hidden.png" className={ classes.responsiveImage } alt="IMG" style={{ maxWidth: "350px"}}/>
    
                      <div className={ classes.centered }>
                        <Button variant="contained" className = { classes.responsiveImageShake } color="secondary"
                        style={{ minWidth: "150px", minHeight: "50px", borderRadius: "30px" }} onClick={handleMint} disabled={isMining}>
                          {isMining ? <CircularProgress size={26} /> : "Mint"}
                        </Button>
                      </div>
                    </Box>
                  )}
                </div>
              </Box>
    
              <Typography variant="h5">Mint price: <b>{claimPriceInMatic} MATIC</b></Typography>
              <br></br>
              <Typography variant="h6" align="left">You are logged as: <b>{ account }</b> </Typography>
              <Typography variant="h6" align="left">Current Network: <span style={{textTransform: 'capitalize'}}><b>{ networkName }</b></span> {isCorrectChain ? (<span style={{color: 'green'}}>✓</span>) : <span style={{color: 'red'}}>✗</span>}</Typography>
              <br></br>
              <Typography variant="h6" align="left">Notes:</Typography>
              <Typography variant="h6" align="left"> {'➢'} Minting process creates your unique random Legionary and sends to your wallet</Typography>
              <Typography variant="h6" align="left"> {'➢'} Once your payment is validated, you will receive a token in your wallet within 5 minutes</Typography>
              <Typography variant="h6" align="left"> {'➢'} OpenSea needs up to 20 minutes to display your newly minted NFT properly</Typography>
              <Typography variant="h6" align="left"> {'➢'} If you want to mint several Legionaries you will have to repeat the operation</Typography>
              <Typography variant="h6" align="left"> {'➢'} Please send only one payment at a time</Typography>
              
              <div className={ classes.centered } style={{minHeight: "200px"}}>
              </div>
    
            </>
          ) : (
            <>
              <Box p={3} mt={3}>
                <div className={ classes.centered }> 
                  <img src="hidden.png" className={classes.responsiveImage} style={{maxWidth: "350px"}} alt="IMG" />
                </div>
                <ol>
                  <li>
                    <Typography align="left" variant="h5" gutterBottom>
                      <span style={{marginRight: '10px'}}>Connect wallet to mint your own PixelLegion NFT</span>
                      {isConnected ? (<span style={{color: 'green'}}>✓</span>) : (<span style={{color: 'red'}}>✗</span>)}
                    </Typography>
                  </li>
                  <li>
                    <Typography align="left" variant="h5" gutterBottom>
                      <span style={{marginRight: '10px'}}>Select {config["deploymentChain"]} network</span>
                      {isCorrectChain ? (<span style={{color: 'green'}}>✓</span>) : (<span style={{color: 'red'}}>✗</span>)}
                    </Typography>
                  </li>
                </ol> 
              </Box>
            </>
          )}
        </>
      )}
    </>
  )
}
export default Get
