import React from 'react';
import {PlayerStatus} from './board_components/PlayerStatus'
import {OpponentStatus} from './board_components/OpponentStatus'
import Japan from './pictures/japan.jpg';
import Usa from './pictures/usa.jpg';

export class StatusWindow extends React.Component {
    render() {
        return (
            <div id="status-window">
                <div id="status-title">
                    <img className="status-flag" alt="flag" src={this.props.country === 'usa' ? Usa : Japan} />
                    Fleet Status
                    <img className="status-flag" alt="flag" src={this.props.country === 'usa' ? Japan : Usa} />
                </div>
                <div id="status-container">
                    <PlayerStatus playerFleetStatus={this.props.playerFleetStatus}/>
                    <OpponentStatus opponentFleetStatus={this.props.opponentFleetStatus}/>
                </div>
            </div>
        )
    }
}