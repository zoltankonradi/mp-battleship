import React from 'react';
import {PlayerSquare} from "./board_components/PlayerSquares";

export class PlayerBoard extends React.Component {

    createBoard = () => {
        const headerRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let rows = [];
        let idCounter = 0;
        rows.push(<span key={"pLetter" + -1} id="boardEmptyLetter">0</span>);
        for (let i = 0; i < headerRow.length; i++) {
            rows.push(<span key={"pLetter" + i} className="boardLetters" >{headerRow[i]}</span>)
        }
        for (let i = 0; i < 10; i++) {
            let squares = [];

            for (let j = 0; j < 10; j++) {
                squares.unshift(<PlayerSquare key={j} id={"p" + (idCounter + j)} x={j} y={i} opponentGameState={this.props.opponentGameState}
                                           changePlayersTurn={this.props.changePlayersTurn}
                                           checkForHit={this.props.checkForHit}
                                           playersTurn ={this.props.playersTurn} />);
            }
            idCounter += 10;
            rows.push(<p key={i}><span className="boardNumbers">{i + 1}</span> {squares}</p>);
        }

        return rows;
    };

    render() {
        return (
            <div id="player-board" className={this.props.playersTurn ? "playerTurn" : "notMyTurn"} >
                {this.createBoard()}
            </div>
        )
    }
}
