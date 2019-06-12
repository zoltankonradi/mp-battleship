import React from 'react';
import {PlayerBoard} from './components/PlayerBoard';
import {OpponentBoard} from './components/OpponentBoard';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.changeGameState = this.changeGameState.bind(this);
        this.state = {
            gameState: []
        }
    }

    componentWillMount() {
        this.setState({
            gameState: [
                [0,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
            ]
        })
    }


    changeGameState = (y, x) => {
        let currentGameState = this.state.gameState;
        currentGameState[y][x] = 1;
        this.setState({
            gameState: currentGameState
        })
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <PlayerBoard gameState={this.state.gameState} changeGameState={this.changeGameState}/>
                </div>
                <div className="row">
                    <OpponentBoard gameState={this.state.gameState}/>
                </div>
            </div>
        );
    }
}
