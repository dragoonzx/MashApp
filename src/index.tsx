import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MoralisProvider } from "react-moralis";

import { CeramicProvider, Networks } from "use-ceramic";
import {
  AuthProvider,
  EthereumAuthProvider,
} from "@ceramicnetwork/blockchain-utils-linking";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

const INFURA_TOKEN = process.env.REACT_APP_INFURA_TOKEN

async function connect(): Promise<AuthProvider> {
  const web3Modal = new Web3Modal({
    network: "rinkeby",
    cacheProvider: false,
    providerOptions: {
      injected: {
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_TOKEN,
        },
      },
    },
  });
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  return new EthereumAuthProvider(provider, accounts[0]);
}

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId={process.env.REACT_APP_MORALIS_APP_ID ?? ''}
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL ?? ''}
    >
      <CeramicProvider
        network={Networks.TESTNET_CLAY}
        connect={connect}
      >
        <App />
      </CeramicProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
