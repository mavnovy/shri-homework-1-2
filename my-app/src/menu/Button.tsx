import React, { Component } from 'react';
import './Button.css';
import {cn} from '@bem-react/classname';

const cnButton = cn('Button');

interface IChildComponentProps extends React.Props<any> {
    name: string,
    text: string;
}

class Button extends Component<IChildComponentProps>{
    render(){
        return (
            <div className={cnButton(this.props.name)} touch-action="none" >
                {this.props.text}
            </div>
        );
    }
}

export default Button;
