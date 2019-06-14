import React from 'react';

export class LogWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentLog: []
        }
    }

    addNewLog() {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const x = this.props.hitLog[1];
        const y = this.props.hitLog[2];
        let currentLog = this.state.currentLog;
        if (this.props.hitLog[0] === 0) {
            currentLog.unshift(<p className="log-message">Shot missed at {letters[this.props.hitLog[1]]} {this.props.hitLog[2] + 1}</p>);
        } else if (this.props.hitLog[0] === 1) {
            currentLog.unshift(<p className="log-message">Plane destroyed at {letters[this.props.hitLog[1]]} {this.props.hitLog[2] + 1}</p>);
        } else if (this.props.hitLog[0] === 2) {
            const health = this.checkShipStatus(2, x, y);
            currentLog.unshift(<p className="log-message">Corvette {health === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]} {this.props.hitLog[2] + 1} {health === 0 ? "" : `HP: ${health}`}</p>);
        } else if (this.props.hitLog[0] === 3) {
            const health = this.checkShipStatus(3, x, y);
            currentLog.unshift(<p className="log-message">Destroyer {health === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]} {this.props.hitLog[2] + 1} {health === 0 ? "" : `HP: ${health}`}</p>);
        } else {
            const health = this.checkShipStatus(4, x, y);
            currentLog.unshift(<p className="log-message">Cruiser {health === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]} {this.props.hitLog[2] + 1} {health === 0 ? "" : `HP: ${health}`}</p>);
        }
        if (currentLog.length > 5) {
            currentLog.pop();
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
        return health;
    };

    render() {
        if (this.props.hitLog[0] !== 'none') {
            this.addNewLog();
        }
        return (
            <div id="log-window">
                {this.state.currentLog}
            </div>
        )
    }
}