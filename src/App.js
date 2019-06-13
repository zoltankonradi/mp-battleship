import React from 'react';
import {PlayerBoard} from './components/PlayerBoard';
import {OpponentBoard} from './components/OpponentBoard';
import {LogWindow} from './components/LogWindow';
import {ChatWindow} from "./components/ChatWindow";
import {StatusWindow} from "./components/StatusWindow";
import {TurnDisplay} from "./components/TurnDisplay";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.changeGameState = this.changeGameState.bind(this);
        this.changePlayersTurn = this.changePlayersTurn.bind(this);
        this.state = {
            playersTurn: true,
            gameState: [
                [0,0,0,0,0,0,0,0,0,0],
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
        }
    }

    componentDidMount() {
        this.generateShip(4);
        this.generateShip(3);
        this.generateShip(3);
        this.generateShip(2);
        this.generateShip(2);
        this.generateShip(2);
        this.generateShip(1);
        this.generateShip(1);
        this.generateShip(1);
        this.generateShip(1);
    }

    generateShip = (size) => {
        const orientation = Math.round((Math.random())) === 1 ? 'h' : 'v';
        if (orientation === 'h') {
            while (true) {
                const y = Math.floor((Math.random() * 10));
                const x = Math.floor((Math.random() * (10 - size)));
                console.log(`GenerateShip => x: ${x}, y: ${y}, alignment: h`);
                if (this.checkPlacement(size, y, x, 'h')) {
                    let board = this.state.gameState;
                    for (let i = x; i < x + size; i++) {
                        board[y][i] = 1;
                    }
                    this.setState({
                        gameState: board
                    });
                    break;
                }
            }
        } else {
            while (true) {
                const y = Math.floor((Math.random() * (10 - size)));
                const x = Math.floor((Math.random() * 10));
                console.log(`GenerateShip => x: ${x}, y: ${y}, alignment: v`);
                if(this.checkPlacement(size, y, x, 'v')) {
                    let board = this.state.gameState;
                    for (let i = y; i < y + size; i++) {
                        board[i][x] = 1;
                    }
                    this.setState({
                        gameState: board
                    });
                    break;
                }
            }
        }
    };

    checkPlacement = (size, y, x, alignment) => {
        const gs = this.state.gameState;
        if (alignment === 'h') {
            for (let i = x - 1; i < x + size + 1; i++) {
                try {
                    if(gs[y + 1][i] !== 0) {
                        console.log(`Invalid => Size: ${size}, x: ${x}, y: ${y + 1}`);
                        return false;
                    }
                } catch (e) {console.log(`E => Size: ${size}, x: ${x}, y: ${y + 1}`);}
                try {
                    if(gs[y][i] !== 0) {
                        console.log(`Invalid => Size: ${size}, x: ${x}, y: ${y}`);
                        return false;
                    }
                } catch (e) {console.log(`E => Size: ${size}, x: ${x}, y: ${y}`);}
                try {
                    if(gs[y - 1][i] !== 0) {
                        console.log(`Invalid => Size: ${size}, x: ${x}, y: ${y - 1}`);
                        return false;
                    }
                } catch (e) {console.log(`E => Size: ${size}, x: ${x}, y: ${y - 1}`);}
            }
        } else {
            for (let i = y - 1; i < y + size + 1; i++) {
                try {
                    if(gs[i][x - 1] !== 0) {
                        console.log(`Invalid => Size: ${size}, x: ${x - 1}, y: ${y}`);
                        return false;
                    }
                } catch (e) {console.log(`E => Size: ${size}, x: ${x - 1}, y: ${y}`);}
                try {
                    if(gs[i][x] !== 0) {
                        console.log(`Invalid => Size: ${size}, x: ${x}, y: ${y}`);
                        return false;
                    }
                } catch (e) {console.log(`E => Size: ${size}, x: ${x}, y: ${y}`);}
                try {
                    if(gs[i][x + 1] !== 0) {
                        console.log(`Invalid => Size: ${size}, x: ${x + 1}, y: ${y}`);
                        return false;
                    }
                } catch (e) {console.log(`E => Size: ${size}, x: ${x + 1}, y: ${y}`);}
            }
        }
        return true;
    };

    changeGameState = (y, x) => {
        let currentGameState = this.state.gameState;
        currentGameState[y][x] = 1;
        this.setState({
            gameState: currentGameState
        })
    };

    changePlayersTurn = () => {
        if (this.state.playersTurn) {
            this.setState({
                playersTurn: false
            })
        }
    };

    forcePlayerChange = () => {
        this.setState({
            playersTurn: true
        })
    };

    render() {
        return (
            <div className="container">
                <div id="feature1">
                    <LogWindow />
                </div>
                <div id="feature2">
                    <StatusWindow />
                </div>
                <div id="feature3">
                    <ChatWindow />
                </div>
                <div id="feature4">
                    <PlayerBoard gameState={this.state.gameState} changeGameState={this.changeGameState} playersTurn={this.state.playersTurn} changePlayersTurn={this.changePlayersTurn}/>
                </div>
                <div id="feature5">
                    <TurnDisplay playersTurn={this.state.playersTurn}/>
                </div>
                <div id="feature6">
                    <OpponentBoard gameState={this.state.gameState} playersTurn={this.state.playersTurn}/>
                </div>
                <button onClick={this.forcePlayerChange}>ForceChange</button>
            </div>
        );
    }
}
