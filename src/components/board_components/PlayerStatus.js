import React from 'react';

export class PlayerStatus extends React.Component {
    render() {
        const shipNames = ['Corvette', 'Frigate', 'Destroyer', 'Cruiser'];
        let fleetDisplay = [];
        for (let i = 0; i < this.props.playerFleetStatus.length; i++) {
            fleetDisplay.push(<p key={"player-status-number" + i} id={"player-status-id" + (i + 1)} className="player-status-numbers">{shipNames[i]}: {this.props.playerFleetStatus[i]}</p>)
        }
        return (
            <span id="status-player">
                {fleetDisplay}
            </span>
        )
    }
}