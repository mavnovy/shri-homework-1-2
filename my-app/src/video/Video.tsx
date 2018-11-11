import React, { Component } from 'react';
import './Video.css';
import {cn, classnames} from '@bem-react/classname';

interface IChildComponentProps extends React.Props<any> {
    name: string;
}

const cnVideoBlock = cn('VideoBlock');

class Video extends Component<IChildComponentProps>{
    render(){
        const cnVideo = cn(this.props.name);
        return (
            <div touch-action="none" className={classnames(cnVideoBlock('Container'), cnVideo())}>
                <video className={cnVideoBlock('Video')} muted playsInline autoPlay></video>
            </div>
        );
    }
}

export default Video;
