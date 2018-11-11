import React, { Component } from 'react';
import './Menu.css';
import Filter from '../Common/Filter/Index';
import { cn } from '@bem-react/classname';
import Button from '../Common/Button/Button';

const cnMenu = cn('Menu');

interface IChildComponentProps extends React.Props<any> {
    handleClick: any;
}

class Menu extends Component<IChildComponentProps>{
    render(){
        return (
            <div className={cnMenu()}>
                <Filter position="right" name="Brightness" text="Яркость"/>
                <Filter position="left" name="Contrast" text="Контраст"/>
                <Button name="Back" text="Назад" handleClick={this.props.handleClick}/>
            </div>
        );
    }
}

export default Menu;
