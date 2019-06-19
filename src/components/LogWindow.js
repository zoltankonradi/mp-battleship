import React from 'react';

export class LogWindow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            keyCounter: 0,
            currentLog: [
                <p key="dummy1" className="dummy-p" >.</p>,
                <p key="dummy2" className="dummy-p" >.</p>,
                <p key="dummy3" className="dummy-p" >.</p>,
                <p key="dummy4" className="dummy-p" >.</p>,
                <p key="dummy5" className="dummy-p" >.</p>,
            ]
        }
    }

    addNewLog() {
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let currentLog = this.state.currentLog;
        let key = this.state.keyCounter;
        if (this.props.hitLog[0] === 0) {
            currentLog.push(<p key={key++} className="log-message" id={this.props.hitLog[4] === 0 ? "log-m-blue" : "log-m-red"}>Shot missed at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1}</p>);
        } else if (this.props.hitLog[0] === 1) {
            currentLog.push(<p key={key++} className="log-message" id={this.props.hitLog[4] === 0 ? "log-m-blue" : "log-m-red"}>Corvette sunk at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1}</p>);
        } else if (this.props.hitLog[0] === 2) {
            currentLog.push(<p key={key++} className="log-message" id={this.props.hitLog[4] === 0 ? "log-m-blue" : "log-m-red"}>Frigate {this.props.hitLog[3] === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1} {this.props.hitLog[3] === 0 ? "" : `HP: ${this.props.hitLog[3]}`}</p>);
        } else if (this.props.hitLog[0] === 3) {
            currentLog.push(<p key={key++} className="log-message" id={this.props.hitLog[4] === 0 ? "log-m-blue" : "log-m-red"}>Destroyer {this.props.hitLog[3] === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1} {this.props.hitLog[3] === 0 ? "" : `HP: ${this.props.hitLog[3]}`}</p>);
        } else {
            currentLog.push(<p key={key++} className="log-message" id={this.props.hitLog[4] === 0 ? "log-m-blue" : "log-m-red"}>Cruiser {this.props.hitLog[3] === 0 ? "sunk" : "hit"} at {letters[this.props.hitLog[1]]}-{this.props.hitLog[2] + 1} {this.props.hitLog[3] === 0 ? "" : `HP: ${this.props.hitLog[3]}`}</p>);
        }
        if (currentLog.length > 5) {
            currentLog.shift();
        }
        this.setState({
            keyCounter: key,
            currentLog: currentLog
        });
        this.props.resetHitLogger();
    }

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