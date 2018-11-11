import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppDesktop from './AppDesktop';
import AppTouch from './AppTouch';
import * as serviceWorker from './serviceWorker';
import { isMobile } from "react-device-detect";

ReactDOM.render(
    isMobile ? <AppTouch /> : <AppDesktop />,
    document.getElementById('root')
);
serviceWorker.unregister();
