import { Typography, Box, Grid, CircularProgress } from "@material-ui/core"
import { ReadContractOnce } from "../hooks/ReadContractOnce"
import { ReadContractMany } from "../hooks/ReadContractMany"
import { GetConnectConstants }  from '../hooks/GetConnectConstants'
import useStyles from '../utils/styles'
import config from "../config.json"

function All() {
  const classes = useStyles()

  const { contractAddress, contractInterface } = GetConnectConstants()

  const totalSupply = parseInt(ReadContractOnce(contractAddress, contractInterface, "totalSupply", []))
  const tokenLimit = parseInt(ReadContractOnce(contractAddress, contractInterface, "tokenLimit", []))
  const tokensLeft = tokenLimit - totalSupply
  const zeroToHundredArr = tokenLimit ? Array.from(Array(tokenLimit).keys()) : []

  var contractCalls = []
  for (var _i = 0; _i < totalSupply; _i++) {
    contractCalls.push({address: contractAddress, abi: contractInterface, method: "tokenByIndex", args: [_i]})
  }
  const responseTokenByIndex = ReadContractMany(contractCalls)

  var tokenIds = undefined
  if (totalSupply === 0) {
    tokenIds = []
  } else {
    if (responseTokenByIndex[0] !== undefined) {
      tokenIds = responseTokenByIndex.map(function(item) {
        return parseInt(item[0], 10);
      })
    }
  }

  

  return (
    <>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom> View images of already minted Legionaries</Typography>
      </Box>
      {(tokenIds !== undefined) ? ( // CircularProgress when tokenIds not found yet
        <Grid container className={classes.gridAllImages}>
          {zeroToHundredArr.map((_, index) => (
            <>
              {((index % 10) === 0 && index !== 0 ) ? ( // spacer for md+
                <>
                <Box className={classes.tenColumnsSpacer}/>
                </>
              ) : null}

              {((index % 5) === 0 && index !== 0 ) ? ( // spacer for sm-
                <>
                <Box className={classes.fiveColumnsSpacer}/>
                </>
              ) : null}

              <Grid item xs={2} sm={2} md={1} lg={1} key={index} style={{height: "110px", marginBottom: "0px"}}>
                {tokenIds.includes(index) ? (
                  <>
                    <a href={`${config["openseaAssetUrl"]}/${index}`} className={classes.linkColor}>
                      <img src={`small/small_PixelLegion ${index}.png`} alt="IMG" loading="lazy"/>
                      <div style={{width: "100px", height: "0px", display: "flex", justifyContent: "center"}}>
                        <span style={{position: "relative", top:"-25px"}}><small>#{index}</small></span>
                      </div>
                    </a>
    
                  </>
                ) : (
                  <div style={{opacity: "35%"}}>
                    <img src={`small_hidden.png`} alt="IMG" loading="lazy"/>
                    <div style={{width: "100px", height: "0px", display: "flex", justifyContent: "center"}}>
                      <span style={{position: "relative", top:"-25px"}}><small>#{index}</small></span>
                    </div>
                  </div>
                )}
              </Grid>
            </>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" gutterBottom>
          <CircularProgress size={36} />
        </Typography>
      )}
      <Box mt={2}>
        <Typography variant="h5" gutterBottom> You can click to view them on OpenSea </Typography>
        {tokensLeft? (<Typography variant="h5" gutterBottom> The hidden ones await to be minted </Typography>) : null}
      </Box>
      <br></br>
    </>
    );
}

export default All;
