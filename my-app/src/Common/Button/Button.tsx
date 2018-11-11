import React, { Component } from 'react';
import './Button.css';
import {cn} from '@bem-react/classname';

const cnButton = cn('Button');

interface IChildComponentProps extends React.Props<any> {
    name: string,
    text: string;
    handleClick: any;
}

class Button extends Component<IChildComponentProps>{
    render(){
        return (
            <div className={cnButton(this.props.name)} touch-action="none" onClick={this.props.handleClick}>
                {this.props.text}
            </div>
        );
    }
}

export default Button;
