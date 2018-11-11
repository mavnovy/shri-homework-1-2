import React, { Component } from 'react';
import './Menu.css';
import Filter from './Filter/Index';
import { cn } from '@bem-react/classname';
import Button from './Button';

const cnMenu = cn('Menu');

class Menu extends Component{
    render(){
        return (
            <div className={cnMenu()}>
                <Filter type="brightness" text="Яркость"/>
                <Filter type="contrast" text="Контраст"/>
                <Button name="Back" text="Назад"/>
            </div>
        );
    }
}

export default Menu;
