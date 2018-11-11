import React, { Component, ComponentState } from 'react';
import './Body.css';
import Menu from './menu/Menu';
import Chart from './Chart';
import Video from './video/Video';
import {cn} from '@bem-react/classname';

const cnPreview = cn('Preview');

interface IChildComponentState extends ComponentState {
    action: {[key: string]: string},
    show: boolean;
}

class Body extends Component<any, IChildComponentState> {
    activeAction: string | null;

    constructor(props: any) {
        super(props);
        this.activeAction = null;
        this.state = {show: false, action: {
            ['action1']:'hide',
            ['action2']:'hide',
            ['action3']:'hide',
            ['action4']:'hide',
        }
        };
        this.onClickHide = this.onClickHide.bind(this);
    }

    onClickShow(atr: any) {
        this.setState({[atr.id]: 'show', show: true});
        this.activeAction = atr.id;
    }

    onClickHide() {
        if(this.activeAction)
            this.setState({[this.activeAction]: 'hide', show: false});
        this.activeAction = null;
    }

    render() {
        return (
            <div>
                <Video name="Video1" action={this.state.action1} handleClick={this.onClickShow.bind(this,{id:'action1'})}/>
                <Video name="Video2" action={this.state.action2} handleClick={this.onClickShow.bind(this,{id:'action2'})}/>
                <Video name="Video3" action={this.state.action3} handleClick={this.onClickShow.bind(this,{id:'action3'})}/>
                <Video name="Video4" action={this.state.action4} handleClick={this.onClickShow.bind(this,{id:'action4'})}/>
                <div className={cnPreview({ visible: this.state.show })}>
                    <Chart/>
                    <Menu handleClick={this.onClickHide}/>
                </div>
            </div>
        );
    }
}

export default Body;
