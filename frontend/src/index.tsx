import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChainId, Config, DAppProvider } from '@usedapp/core';

const alchemyKey: string =
  process.env.REACT_APP_ALCHEMY_KEY || `your alchemy key`;

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyKey}`,
  },
  supportedChains: [ChainId.Rinkeby],
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
