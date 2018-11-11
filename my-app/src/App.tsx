import React from 'react';
import './App.css';
import { Body, cnBody} from './Body/Body';
import { RegistryConsumer } from '@bem-react/di';
import {cn} from '@bem-react/classname';

const cnApp = cn('App');

export const App: React.SFC = () => (
    <RegistryConsumer>
        {registries => {
            const platform = registries[cnApp()];
            const Body = platform.get(cnBody());

            return (
                <div className="App">
                    <Body/>
                </div>
            )

        }}
    </RegistryConsumer>
);
