import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { isMobile } from "react-device-detect";
import * as serviceWorker from './serviceWorker';


const App = isMobile ? (require('./App.registry/App@mobile').App) : (require('./App.registry/App@desktop').App);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
serviceWorker.unregister();
