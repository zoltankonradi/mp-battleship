import React from 'react';

export class LogWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLog: [<p key="dummy1" className="dummy-p" >.</p>,
                         <p key="dummy2" className="dummy-p" >.</p>,
                         <p key="dummy3" className="dummy-p" >.</p>,
                         <p key="dummy4" className="dummy-p" >.</p>,
                         <p key="dummy5" className="dummy-p" >.</p>,
            ]
        }
    }

    addNewLog() {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const x = this.props.hitLog[1];
        const y = this.props.hitLog[2];
        let currentLog = this.state.currentLog;
        if (this.props.hitLog[0] === 0) {
            currentLog.push(<p className="log-message" id={this.props.playersTurn ? "log-m-blue" : "log-m-red"}>Shot missed at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1}</p>);
        } else if (this.props.hitLog[0] === 1) {
            this.props.changePlayerFleetCount(1);
            currentLog.push(<p className="log-message" id={this.props.playersTurn ? "log-m-blue" : "log-m-red"}>Corvette sunk at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1}</p>);
        } else if (this.props.hitLog[0] === 2) {
            const health = this.checkShipStatus(2, x, y);
            currentLog.push(<p className="log-message" id={this.props.playersTurn ? "log-m-blue" : "log-m-red"}>Frigate {health === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1} {health === 0 ? "" : `HP: ${health}`}</p>);
        } else if (this.props.hitLog[0] === 3) {
            const health = this.checkShipStatus(3, x, y);
            currentLog.push(<p className="log-message" id={this.props.playersTurn ? "log-m-blue" : "log-m-red"}>Destroyer {health === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1} {health === 0 ? "" : `HP: ${health}`}</p>);
        } else {
            const health = this.checkShipStatus(4, x, y);
            currentLog.push(<p className="log-message" id={this.props.playersTurn ? "log-m-blue" : "log-m-red"}>Cruiser {health === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1} {health === 0 ? "" : `HP: ${health}`}</p>);
        }
        if (currentLog.length > 5) {
            currentLog.shift();
        }
        this.setState({
            currentLog: currentLog
        });
        this.props.resetHitLogger();
    }

    checkShipStatus = (size, x, y) => {
        const gameState = this.props.gameState;
        let health = 0;
        for (let i = x + 1; i < x + size; i++) {
            try {
                if (gameState[y][i] === 0) {
                    break;
                } else if (gameState[y][i] === size) {
                    health++;
                }
            } catch (e) { console.log(`checkShipStatus E => X: ${i} Y: ${y}`); }

        }
        for (let i = x - 1; i > x - size; i--) {
            try {
                if (gameState[y][i] === 0) {
                    break;
                } else if (gameState[y][i] === size) {
                    health++;
                }
            } catch (e) { console.log(`checkShipStatus E => X: ${i} Y: ${y}`); }
        }
        if (health === 0) {
            for (let i = y - 1; i > y - size; i--) {
                try {
                    if (gameState[i][x] === 0) {
                        break;
                    } else if (gameState[i][x] === size) {
                        health++;
                    }
                } catch (e) { console.log(`checkShipStatus E => X: ${y} Y: ${i}`); }
            }
            for (let i = y + 1; i < y + size; i++) {
                try {
                    if (gameState[i][x] === 0) {
                        break;
                    } else if (gameState[i][x] === size) {
                        health++;
                    }
                } catch (e) { console.log(`checkShipStatus E => X: ${y} Y: ${i}`); }
            }
        }
        if (health === 0) { this.props.changePlayerFleetCount(size); }
        return health;
    };

    render() {
        if (this.props.hitLog[0] !== 'none') {
            this.addNewLog();
        }
        return (
            <div id="log-window">
                <div id="log-title">
                    Battle Log
                </div>
                <div id="log-messages">
                    {this.state.currentLog}
                </div>
            </div>
        )
    }
}