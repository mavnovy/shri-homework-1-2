import React, { Component } from 'react';
import './Menu.css';
import Filter from './Filter/Index';
import { cn } from '@bem-react/classname';
import Button from './Button';

const cnMenu = cn('Menu');

interface IChildComponentProps extends React.Props<any> {
    handleClick: any;
}

class Menu extends Component<IChildComponentProps>{
    render(){
        return (
            <div className={cnMenu()}>
                <Filter type="brightness" text="Яркость"/>
                <Filter type="contrast" text="Контраст"/>
                <Button name="Back" text="Назад" handleClick={this.props.handleClick}/>
            </div>
        );
    }
}

export default Menu;
