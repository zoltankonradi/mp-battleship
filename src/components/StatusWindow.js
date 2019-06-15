import React from 'react';
import {PlayerStatus} from './board_components/PlayerStatus'
import {OpponentStatus} from './board_components/OpponentStatus'

export class StatusWindow extends React.Component {
    render() {
        return (
            <div id="status-window">
                <div id="status-title">
                    <img className="status-flag" alt="flag" src={require('./pictures/japan.jpg')} />
                    Fleet Status
                    <img className="status-flag" alt="flag" src={require('./pictures/usa.jpg')} />
                </div>
                <div id="status-container">
                    <PlayerStatus playerFleetStatus={this.props.playerFleetStatus}/>
                    <OpponentStatus opponentFleetStatus={this.props.opponentFleetStatus}/>
                </div>
            </div>
        )
    }
}