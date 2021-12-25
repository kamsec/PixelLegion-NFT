import React from 'react';
import { DAppProvider } from "@usedapp/core"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Main } from "./components/Main"
import { ThemeProvider, Container } from "@material-ui/core"
import theme from './utils/theme'
import Home from './pages/home'
import Get from './pages/get'
import All from './pages/all'
import Support from './pages/support'
import config from "./config.json"

const dappConfig = {
  supportedChains: [config["deploymentChainId"]],
  readOnlyChainId: config["deploymentChainId"],
  readOnlyUrls: {
    [config["deploymentChainId"]]: "https://polygon-mainnet.g.alchemy.com/v2/1LChmZFJkhlVS5gxNqzxDNgpXX60JpAm",
  },
}

function App() {
  return (
  <BrowserRouter basename={config["appBaseName"]}>
    <DAppProvider config={dappConfig}>
      <ThemeProvider theme={theme}>
        <Main />
        <div style={{minHeight: '100vh', position: "relative", paddingBottom: "100px"}}>
        <Navbar />
        <Container maxWidth="md">
          <Routes>
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="get/" element={<Get />} />
              <Route path="all/" element={<All />} />
              <Route path="support/" element={<Support />} />
            </>
          </Routes>
        </Container>
        <Footer />
        </div>
      </ThemeProvider>
    </DAppProvider>
  </BrowserRouter>
  );
}

export default App;
