import React, { Component } from 'react';
import './Body.css';
import Menu from './menu/Menu';
import Chart from './Chart';
import Video from './video/Video';
import {cn} from '@bem-react/classname';

const cnPreview = cn('Preview');

class Body extends Component {
    isShow: boolean = true;

    changeVisiblePreview() {
        this.isShow = !this.isShow;
    };

    render() {
        return (
            <div>
                <Video name="Video1"/>
                <Video name="Video2"/>
                <Video name="Video3"/>
                <Video name="Video4"/>
                <div className={cnPreview({ visible: this.isShow })}>
                    <Chart/>
                    <Menu/>
                </div>
            </div>
        );
    }
}

export default Body;
