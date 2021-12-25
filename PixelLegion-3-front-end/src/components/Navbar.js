import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Tab, Tabs, Toolbar, Button,
     makeStyles, useMediaQuery, useTheme, IconButton, Menu, MenuItem, } from '@material-ui/core'
import { useEthers } from "@usedapp/core"
import { Link, useLocation } from 'react-router-dom'
import MenuIcon from "@material-ui/icons/Menu"
import useStyles from '../utils/styles'
import config from "../config.json"

export const Navbar = () => {
    const useStylesNavbar = makeStyles((theme) => ({
        spacer: {
            flex: '1 1 100%',
        },
        side: {
            flex: '0 0 auto',
        },
        offset: theme.mixins.toolbar,
        connectButton: {
            whiteSpace: "nowrap",
            minWidth: '150px',
            maxHeight: '37px',
            marginTop: '5px',
            borderRadius: "30px",
        },
        disconnectButton: {
            whiteSpace: "nowrap",
            minWidth: '150px',
            maxHeight: '37px',
            marginTop: '5px',
            borderRadius: "30px",
        },
        connectButtonWide: {
            whiteSpace: "nowrap",
            minWidth: '90%',
            maxHeight: '37px',
            marginTop: '5px',
            borderRadius: "30px",
        },
        disconnectButtonWide: {
            whiteSpace: "nowrap",
            minWidth: '90%',
            maxHeight: '37px',
            marginTop: '5px',
            borderRadius: "30px",
        },
        menuPaper: {
            backgroundColor: theme.palette.primary.main
        }
    }))
    const classes = useStylesNavbar()
    const mainClasses = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()
    const isConnected = ((account !== undefined) && (account !== null)) 

    const [value, setValue] = useState(0);
    const handleClickTab = (event, newValue) => {
        setValue(newValue)
    }

    const [anchor, setAnchor] = useState(null);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const openMenu = (event) => {
        setAnchor(event.currentTarget)
      }
    const closeMenu = () => {
        setAnchor(null);
      };
    const open = Boolean(anchor)

    // handling navigation bar switch effect - this way works also if i change pages through other components buttons
    const location = useLocation().pathname;
    useEffect(() => {
        if (location === '/') {
            handleClickTab(null, 0)
        } else if (location === '/get') {
            handleClickTab(null, 1)
        } else if (location === '/all') {
            handleClickTab(null, 2)
        } else if (location === '/support') {
            handleClickTab(null, 3)
        }
      }, [location])

    return (
        <>
            <AppBar color="primary">
                {isMobile ? (
                    <Toolbar className={mainClasses.centered}>
                        {isConnected ? (
                            <Button disableRipple color="secondary" variant="contained"  className={classes.disconnectButtonWide}
                                onClick={() => deactivate()}>
                                Disconnect
                            </Button>
                        ) : (
                            <Button disableRipple color="secondary" variant="contained" className={classes.connectButtonWide}
                                onClick={() => activateBrowserWallet()}>
                                Connect Wallet
                            </Button>
                        )}
                    </Toolbar>
                ) : null}
                <Toolbar>
                    <div className={classes.side} style={{display: "flex", alignItems: "center"}}>
                        <Link to="/" style={{paddingRight: "10px"}}>
                            <img src="logo.png" className={ mainClasses.responsiveImageShake } alt="logo"/>
                        </Link>
                        <span style={{borderLeft: `2px solid ${theme.palette.secondary.main}`}}><p></p></span>
                        <a href={config["discordUrl"]} style={{ marginLeft: "20px"}}>
                            <img src="discord-icon.svg" alt="" style={{width: "25px", paddingTop: "7px"}}/>
                        </a>
                        <a href={config["twitterUrl"]} style={{ marginLeft: "15px"}}>
                            <img src="twitter-icon.svg" alt="" style={{width: "25px", paddingTop: "7px"}}/>
                        </a>
                        <a href={config["openseaCollectionUrl"]} style={{ marginLeft: "15px",  marginRight: "15px"}}>
                            <img src="opensea-icon.svg" alt="" style={{width: "25px", paddingTop: "7px"}}/>
                        </a>
                        
                    </div>
                    <div className={classes.spacer}></div>
                    {isMobile ? (
                        <>
                            <div>
                                <IconButton
                                    //color="textPrimary"
                                    color="secondary"
                                    className={classes.menuButton}
                                    edge="start"
                                    aria-label="menu"
                                    onClick={openMenu}
                                > 
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchor}
                                    anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                    }}
                                    open={open}
                                    onClose={closeMenu}
                                    classes={{ paper: classes.menuPaper }}>
                                    <MenuItem onClick={closeMenu} component={Link} to="/">
                                        <Typography variant="h6" style={{color: "white"}}>Home</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={closeMenu} component={Link} to="/get">
                                        <Typography variant="h6" style={{color: "white"}}>Get Your Own</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={closeMenu} component={Link} to="/all">
                                        <Typography variant="h6" style={{color: "white"}}>All Legionaries</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={closeMenu} component={Link} to="/support">
                                        <Typography variant="h6" style={{color: "white"}}>Support</Typography>
                                    </MenuItem>
                                </Menu>
                            </div>
                            
                        </>
                    ) : (
                        <div className={classes.side}>
                            <Tabs
                                value={value}
                                //onChange={handleClickTab}  /* no need anymore, handling this with useEffect */
                                indicatorColor="secondary"
                                >
                                <Tab disableRipple label='Home' style={{minWidth: "140px"}} component={Link} to="/" />
                                <Tab disableRipple label='Get Your Own' style={{minWidth: "140px"}} component={Link} to="/get" />
                                <Tab disableRipple label='All Legionaries' style={{minWidth: "140px"}} component={Link} to="/all" />
                                <Tab disableRipple label='Support' style={{minWidth: "140px"}} component={Link} to="/support"/>
                                {isConnected ? (
                                    <Button disableRipple color="secondary" variant="contained"  className={classes.disconnectButton}
                                        onClick={() => deactivate()}>
                                        Disconnect
                                    </Button>
                                ) : (
                                    <Button disableRipple color="secondary" variant="contained"  className={classes.connectButton}
                                        onClick={() => activateBrowserWallet()}>
                                        Connect Wallet
                                    </Button>
                                )}
                            </Tabs>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {isMobile ? (
                <>
                    <div className={classes.offset} />
                    <div className={classes.offset} />
                </>
            ) : (
                <div className={classes.offset} />
            )}
        </>
    )
}


