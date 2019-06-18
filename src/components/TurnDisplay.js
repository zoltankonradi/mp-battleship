import React from 'react';
import Japan from './pictures/japan.jpg';
import Usa from './pictures/usa.jpg';

export class TurnDisplay extends React.Component {
    render() {
        return (
            <div id="turn-display" className={this.props.playersTurn ? "playerTurn" : "opponentTurn"}>
                {this.props.playersTurn ? "" : <img id='flag-left' alt="flag" src={this.props.country === 'usa' ? Japan : Usa} />}
                <h1 id={this.props.playersTurn ? "turn-display-text1" : "turn-display-text2"}>{this.props.playersTurn ? "Your turn!" : "Opponent's turn!"}</h1>
                {this.props.playersTurn ? <img id='flag-right' alt="flag" src={this.props.country === 'japan' ? Japan : Usa} /> : ""}
            </div>
        )
    }
}