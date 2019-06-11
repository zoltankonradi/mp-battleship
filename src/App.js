import React from 'react';
import {PlayerBoard} from './components/PlayerBoard';
import {OpponentBoard} from './components/OpponentBoard';

export class App extends React.Component {
    render() {
        return (
            <div className="container">
                <PlayerBoard/>
                <div className="row">
                    <OpponentBoard/>
                </div>
            </div>
        );
    }
}
