import { makeStyles } from '@material-ui/core'


export const Footer = () => {
    const useStylesFooter = makeStyles((theme) => ({
        footer:{
            background: theme.palette.primary.main,
            height: '100px',
            color: "white",
            position: "absolute",
            bottom: 0,
            width: "100%",
        },
        centered: {
            position: "relative",
            top: "35%",
            textAlign: "center",
        },
        text: {
            color: "white",
            fontWeight: "bold",
        },
        image:{
            verticalAlign: "middle",
            paddingRight: "8px",
            marginBottom: "2px"
        }
    }))
    const classes = useStylesFooter()

    return (
        <div className={classes.footer}>
            <div className={classes.centered}>
                <a href="https://polygon.technology/">
                    <img src="matic-token-icon.svg" width="23" className={classes.image} alt="logo" />
                    <span className={classes.text}>Powered by Polygon</span>
                </a>
            </div>
        </div>
    )
}
