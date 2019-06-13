import React from 'react';

export class TurnDisplay extends React.Component {
    render() {
        return (
            <div id="turn-display" className={this.props.playersTurn ? "playerTurn" : "opponentTurn"}>
                {this.props.playersTurn ? "" : <img id="flag-usa" alt="flag" src={require('./pictures/usa.jpg')} />}
                <h1 id={this.props.playersTurn ? "turn-display-text1" : "turn-display-text2"}>{this.props.playersTurn ? "Your turn!" : "Opponent's turn!"}</h1>
                {this.props.playersTurn ? <img id="flag-japan" alt="flag" src={require('./pictures/japan.jpg')} /> : ""}
            </div>
        )
    }
}