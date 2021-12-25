import { Typography, Box } from "@material-ui/core";
import useStyles from '../utils/styles'

function Support() {
  const classes = useStyles()
  return (
    <Box mt={3}>

      <Typography variant="h6" align="left" gutterBottom><b>What is a PixelLegion?</b></Typography>
      
      <Typography paragraph={true} align="left" gutterBottom>
        PixelLegion is an unique one of a kind Non-Fungible Token (NFT) on Polygon. By minting a Legionary,
        you become the proud owner of the very first PixelLegion NFT on the Polygon network. What’s more is,
        there can only ever be 100 legionaries. When you decide to mint one, you will receive
        a unique-one-of-a-kind Legionary with proof of ownership stored on the polygon network.
        Who knows? Your very first PixelLegion NFT may be worth your first house or car!
      </Typography>

      <Typography variant="h6" align="left" gutterBottom><b>Why is PixelLegion special?</b></Typography>

      <Typography paragraph={true} align="left" gutterBottom>
        The popular cryptopunks on the Ethereum mainnet shocked the world when rare punks sold
        for over 6 million U.S dollars (<a href="https://techcrunch.com/2021/04/08/the-cult-of-cryptopunks/" className={classes.linkColor}>source</a>).
        To this day, even non-rare cryptopunks trade within 5 to 6 digits!
        “Why?” Some people ask, as there is no tangibility to NFTs. As famed Cathie Wood <a href="https://www.businessinsider.com/cathie-wood-shares-outlook-nfts-bitcoin-4-top-ark-holdings-2021-3" className={classes.linkColor}>stated</a>,
        there is wonder in these digital arts as “blockchain technologies [provide] — immutability”.
        There is preservation and worth stored in these cute little art pieces, and with varying rarity,
        it makes sense the extremely rare ones fetch a high price.
      </Typography>

      <Typography paragraph={true} align="left" gutterBottom>
        So back to the question, why PixelLegion? Simple: Speed, Supply, and Scarcity.
        Not only is Polygon extremely fast and cost efficient, but there is also a rise in demand
        for NFTs that are both scarce and in demand.
      </Typography>

      <Typography paragraph={true} align="left" gutterBottom>
        Once the 100 legionaries are minted, there will never be an opportunity to get your hands on one
        unless you buy one on the market.
      </Typography>

      <Typography variant="h6" align="left" gutterBottom><b>How to get a PixelLegion NFT</b></Typography>
      
      <Typography paragraph={true} align="left" gutterBottom>
      You will have to use $Matic to purchase a Legionary. Once you connect your metamask wallet
      on the website and confirm the appropriate amount, approve the transaction.
      </Typography>

      <Typography paragraph={true} align="left" gutterBottom>
      <span style={{color: "red"}}>Caution</span>: Please double and triple check that you have $Matic on the right mainnet (Polygon Main Network).
      If you use a wrapped version, your funds will be lost.
      </Typography>
      <Typography variant="h6" align="left" gutterBottom><b>How to move wrapped $Matic to the mainnet (e.g., BSC ➔ Polygon or ETH ➔ Polygon)</b></Typography>
      
      <Typography paragraph={true} align="left" gutterBottom style={{"word-break": "break-all"}}>
        <a href="https://docs.matic.network/docs/develop/wallets/matic-web-wallet/web-wallet-v2-guide/" className={classes.linkColor}>
        https://docs.matic.network/docs/develop/wallets/matic-web-wallet/web-wallet-v2-guide/</a>
      </Typography>

      <Typography variant="h6" align="left" gutterBottom><b>How to add the Polygon Main Network on metamask</b></Typography>

      <Typography paragraph={true} align="left" gutterBottom style={{"word-break": "break-all"}}>
        <a href="https://docs.matic.network/docs/develop/metamask/config-matic/" className={classes.linkColor}>
        https://docs.matic.network/docs/develop/metamask/config-matic/</a>
      </Typography>

    </Box>
  )
}
export default Support;