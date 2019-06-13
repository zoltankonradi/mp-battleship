import React from 'react';
import {PlayerBoard} from './components/PlayerBoard';
import {OpponentBoard} from './components/OpponentBoard';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.changeGameState = this.changeGameState.bind(this);
        this.state = {
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
        this.generateShip(5);
        this.generateShip(4);
        this.generateShip(3);
        this.generateShip(3);
        this.generateShip(2);
        this.generateShip(2);
        this.generateShip(2);
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
