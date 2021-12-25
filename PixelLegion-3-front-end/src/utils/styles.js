import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    footer:{
        background: theme.palette.primary.main,
        height: '100px',
        color: "white",
    },
    centeredText: {
        textAlign: "center",
    },
    centered: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textPurple: {
        color: "#8247e5",
        fontWeight: "bold",
    },
    textWhite: {
        color: "white",
        fontWeight: "bold",
    },
    image:{
        verticalAlign: "middle",
        paddingRight: "8px",
        marginBottom: "2px"
    },
    unorderedList:{
      display: "inline-block",
      textAlign: "left",
    },
    responsiveImage:{
      width: "100%",
      height: "auto"
    },
    spinner:{
      transform: "rotateY(40deg)",
      animation: "two 2s infinite",
      animationDirection: "alternate",
    },
    responsiveImageShake: {
      '&:hover': {
        animation: 'shake 0.3s infinite'
      }
    },
    linkColor: {
     '&:link': {
      color: "#551a8b",
      }
    },
    gridAllImages: {
      justifyContent: "center",
      [theme.breakpoints.down('xs')]: {marginLeft: "-5%"}, // fix - for some reason on xs theres space here
    },
    tenColumnsSpacer: {
      [theme.breakpoints.up('md')]: {width: "100%",
      backgroundColor: 'red'}, // colors just to make it easy to notice if something works wrong
      [theme.breakpoints.down('sm')]: {width: "0%",
      backgroundColor: 'green'},
    },
    fiveColumnsSpacer: {
      [theme.breakpoints.up('md')]: {width: "0%",
      backgroundColor: 'red'},
      [theme.breakpoints.down('sm')]: {width: "100%",
      backgroundColor: 'green'},
    },
    displayedContractAddress: {
      [theme.breakpoints.up('md')]: {fontSize: "1.25rem"},
      [theme.breakpoints.down('sm')]: {fontSize: "0.85rem"},
    }
  }))

export default useStyles

