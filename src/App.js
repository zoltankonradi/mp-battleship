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
        this.checkForHit = this.checkForHit.bind(this);
        this.resetHitLogger = this.resetHitLogger.bind(this);
        this.changePlayerFleetCount = this.changePlayerFleetCount.bind(this);
        this.state = {
            country: "",
            playersTurn: false,
            hitLog: ['none', 'none', 'none'],
            playerFleetStatus: [4, 3, 2, 1],
            opponentFleetStatus: [4, 3, 2, 1],
            playerGameState: [
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
            ],
            opponentGameState: [
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
        };
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
        this.props.socket.emit('send initial game state', {
            opponentId: this.props.opponentId,
            playerFleetStatus: this.state.playerFleetStatus,
            playerGameState: this.state.playerGameState,
        });
    }
    //////////////////////////
    // SERVER COMMUNICATION //
    //////////////////////////
    componentDidMount() {
        this.props.socket.on('get game state', (data) => {
            this.setState({
                playersTurn: true,
                playerGameState: data.playerGameState,
                playerFleetStatus: data.playerFleetStatus
            })
        });
        this.props.socket.on('get initial game state', (data) => {
            this.setState({
                opponentGameState: data.opponentGameState,
                opponentFleetStatus: data.opponentFleetStatus
            });
            this.setUpCountries();
        });
        this.setState({
            playersTurn: this.props.challenged
        });
    }

    setUpCountries = () => {
        if (this.state.playersTurn) {
            this.setState({ country: "japan" });
        } else {
            this.setState({ country: "usa" });
        }
    };

    ////////////////
    // GAME LOGIC //
    ////////////////
    generateShip = (size) => {
        const orientation = Math.round((Math.random())) === 1 ? 'h' : 'v';
        const representations = [1, 2, 3, 4];
        const representation = representations[size - 1];
        if (orientation === 'h') {
            while (true) {
                const y = Math.floor((Math.random() * 10));
                const x = Math.floor((Math.random() * (10 - size)));
                console.log(`GenerateShip => x: ${x}, y: ${y}, alignment: h`);
                if (this.checkPlacement(size, y, x, 'h')) {
                    let board = this.state.playerGameState;
                    for (let i = x; i < x + size; i++) {
                        board[y][i] = representation;
                    }
                    this.setState({
                        playerGameState: board
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
                    let board = this.state.playerGameState;
                    for (let i = y; i < y + size; i++) {
                        board[i][x] = representation;
                    }
                    this.setState({
                        playerGameState: board
                    });
                    break;
                }
            }
        }
    };

    checkPlacement = (size, y, x, alignment) => {
        const gs = this.state.playerGameState;
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

    checkForHit = (x, y) => {
        if (this.state.opponentGameState[y][x] === 0) {
            this.setState({ hitLog: [0, x, y] });
            this.changeGameState(x, y, false);
        } else if(this.state.opponentGameState[y][x] === 1) {
            this.setState({ hitLog: [1, x, y] });
            this.changeGameState(x, y, true);
        } else if(this.state.opponentGameState[y][x] === 2) {
            this.setState({ hitLog: [2, x, y] });
            this.changeGameState(x, y, true);
        } else if(this.state.opponentGameState[y][x] === 3) {
            this.setState({ hitLog: [3, x, y] });
            this.changeGameState(x, y, true);
        } else {
            this.setState({ hitLog: [4, x, y] });
            this.changeGameState(x, y, true);
        }
    };

    resetHitLogger = () => {
        this.setState({ hitLog: ['none', 'none', 'none'] })
    };

    changeGameState = (x, y, hit) => {
        let currentGameState = this.state.opponentGameState;
        if (hit) {
            currentGameState[y][x] = 5;
        } else {
            currentGameState[y][x] = 6;
        }
        this.setState({ opponentGameState: currentGameState })
    };

    changePlayersTurn = () => {
        if (this.state.playersTurn) { this.setState({ playersTurn: false }) }
        this.props.socket.emit('send game state', {
            opponentId: this.props.opponentId,
            opponentFleetStatus: this.state.opponentFleetStatus,
            opponentGameState: this.state.opponentGameState,
        });
    };

    changePlayerFleetCount = (size) => {
        let fleet = this.state.playerFleetStatus;
        fleet[size - 1] -= 1;
        this.setState({ playerFleetStatus: fleet })
    };

    render() {
        return (
            <div className="game-container">
                <div id="feature1">
                    <LogWindow resetHitLogger={this.resetHitLogger} hitLog={this.state.hitLog} gameState={this.state.playerGameState}
                               playersTurn={this.state.playersTurn} changePlayerFleetCount={this.changePlayerFleetCount}/>
                </div>
                <div id="feature2">
                    <StatusWindow playerFleetStatus={this.state.playerFleetStatus} opponentFleetStatus={this.state.opponentFleetStatus}/>
                </div>
                <div id="feature3">
                    <ChatWindow />
                </div>
                <div id="feature4">
                    <PlayerBoard opponentGameState={this.state.opponentGameState} playersTurn={this.state.playersTurn}
                                 changePlayersTurn={this.changePlayersTurn} checkForHit={this.checkForHit} />
                </div>
                <div id="feature5">
                    <TurnDisplay country={this.state.country} playersTurn={this.state.playersTurn}/>
                </div>
                <div id="feature6">
                    <OpponentBoard playerGameState={this.state.playerGameState} playersTurn={this.state.playersTurn}/>
                </div>
            </div>
        );
    }
}
