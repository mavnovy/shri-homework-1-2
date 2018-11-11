import React, { Component, ComponentState } from 'react';
import './Video.css';
import {cn, classnames} from '@bem-react/classname';

interface IChildComponentProps extends React.Props<any> {
    name: string;
    action: string;
    handleClick: any;
}

const cnVideoBlock = cn('VideoBlock');

class Video extends Component<IChildComponentProps>{
    render(){
        const cnVideo = cn(this.props.name);
        return (
            <div touch-action="none"
                 className={classnames(cnVideoBlock('Container',{action: this.props.action}), cnVideo())}
                 onClick={this.props.handleClick}>
                <video className={cnVideoBlock('Video')} muted playsInline autoPlay></video>
            </div>
        );
    }
}

export default Video;
