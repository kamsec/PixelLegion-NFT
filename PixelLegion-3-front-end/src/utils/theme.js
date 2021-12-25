import { createTheme } from '@material-ui/core'

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: '#39344d' //'#003049'
        },
        secondary: {
            main: '#d62828' //'#cfffff'
        },
    },
    typography: {
        "fontFamily": `"Poppins", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 400
       }
})

export default theme
