import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { App as AppMobile } from './App.registry/App@mobile';
import { App as AppDesktop } from './App.registry/App@desktop';
import * as serviceWorker from './serviceWorker';
import { isMobile } from "react-device-detect";

ReactDOM.render(
    isMobile ? <AppMobile /> : <AppDesktop />,
    document.getElementById('root')
);
serviceWorker.unregister();
