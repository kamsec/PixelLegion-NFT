import { Typography, Button, Box } from "@material-ui/core"
import { ReadContractOnce } from "../hooks/ReadContractOnce"
import { Link } from 'react-router-dom'
import useStyles from '../utils/styles'
import { GetConnectConstants }  from '../hooks/GetConnectConstants'
import config from "../config.json"

function Home() {
  const classes = useStyles()
  const { contractAddress, contractInterface } = GetConnectConstants()

  const tokenLimit = parseInt(ReadContractOnce(contractAddress, contractInterface, "tokenLimit", []))
  const totalSupply = parseInt(ReadContractOnce(contractAddress, contractInterface, "totalSupply", []))
  const tokensLeft = tokenLimit - totalSupply

  return (
    <>
      <div style={{"marginTop": "25px"}}>
        <Typography variant="h5" gutterBottom>PixelLegion are NFTs on the Polygon blockchain</Typography>

        <img src="example_legionaries.png" className={classes.responsiveImage} alt="IMG" />

        <div className={classes.centered}>
          <a href="https://polygon.technology/">
              <img src="matic-token-icon.svg" width="23" className={classes.image} alt="logo" />
              <span className={classes.textPurple}>Powered by Polygon</span>
          </a>
        </div>

        <br></br>

        <div className={ classes.centered }>
          <Box bgcolor="#39344d" p={3} sx={{ borderRadius: '50px', maxWidth: '50%', minWidth: '220px'}}>
              <Typography variant="h5" gutterBottom style={{color:"white"}}>PixelLegion NFTs remaining
              <span style={{whiteSpace: "nowrap"}}>
                <span style={{borderBottom: "1px solid #8247e5", marginLeft: "20px"}}>{ tokensLeft }</span>
                <span><small> / { tokenLimit }</small></span>
              </span>
              </Typography>

          </Box>
          </div>
        <br></br>

        {(tokensLeft > 0) ? (
          <>
            <div className={classes.centered}>
              <Button variant="contained" color="secondary" style={{ borderRadius: "30px" }} component={Link} to="/get">Get your own</Button>
            </div>
            <div className={classes.centered}>
              <small>or</small>
            </div>
          </>
        ) : (
          <>
            <div className={classes.centered}>
              All our NFTs have been minted!<br></br>
              You can still buy them from traders on OpenSea.
            </div><br></br>
          </>
        )}

        <div className={classes.centered}>
          <a href={config["openseaCollectionUrl"]}>
            <Button variant="contained" color="secondary" style={{ borderRadius: "30px" }}>Trade on OpenSea</Button>
          </a>
        </div>

        <br></br>

        <div>
          <div style={{"marginLeft": "8%"}}><b>Features:</b></div>
          <div className={classes.centered}>
            <ul className={classes.unorderedList}>
              <li><span style={{color: 'green'}}>✓ </span>Generated algorithmically from manually crafted assets</li>
              <li><span style={{color: 'green'}}>✓ </span>Each Legionary has unique set of attributes, according to defined rarity system</li>
              <li><span style={{color: 'green'}}>✓ </span>The identity of each Legionary is a mystery until your purchase is completed</li>
              <li><span style={{color: 'green'}}>✓ </span>Maximum supply is limited to 100 tokens</li>
              <li><span style={{color: 'green'}}>✓ </span>Metadata and images stored on IPFS</li>
              <li><span style={{color: 'green'}}>✓ </span>IPFS hash of each image stored on chain</li>
              <li><span style={{color: 'green'}}>✓ </span>Public and verified Smart Contract code</li>
            </ul>
          </div>
        </div>

        <br></br>
        <div className={classes.centered}>
          <Typography variant="body1" style={{color:"gray"}}><span>PixelLegion contract address</span></Typography>
        </div>

        <a href={`${config["blockchainScanUrl"]}${contractAddress}`} className={classes.linkColor}>
          <Typography variant="h6" gutterBottom className={classes.displayedContractAddress}><span>{ contractAddress }</span></Typography>
        </a>
        

        <br></br>

      </div>
        
    </>
  )
}
export default Home;