import React from 'react';
import './Filter.css';
import { IFilterProps } from './Index';

export const Filter: React.SFC<IFilterProps> = ({ text, className }) => (
    <div className={className}>
        {text} <span>15</span>
        <input type="range" value="100" min="0" max="200"/>
    </div>
);
