import React, { Component } from 'react';
import './Chart.css';
import {cn} from '@bem-react/classname';

const cnChart = cn('Chart');

class Chart extends Component{
    render(){
        return (
            <div className={cnChart('Volume')} touch-action="none" >
            </div>
        );
    }
}

export default Chart;
