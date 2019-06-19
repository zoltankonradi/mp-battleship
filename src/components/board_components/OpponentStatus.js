import React from 'react';

export class OpponentStatus extends React.Component {
    render() {
        const shipNames = ['Corvette', 'Frigate', 'Destroyer', 'Cruiser'];
        let fleetDisplay = [];
        for (let i = 0; i < this.props.opponentFleetStatus.length; i++) {
            fleetDisplay.push(<p key={"opponent-status-number" + i} id={"opponent-status-id" + (i + 1)} className={this.props.opponentFleetStatus[i] === 0 ? "opponent-status-numbers text-crossed" : "opponent-status-numbers"}>{shipNames[i]}: {this.props.opponentFleetStatus[i]}</p>)
        }
        return (
            <span id="status-opponent">
                {fleetDisplay}
            </span>
        )
    }
}