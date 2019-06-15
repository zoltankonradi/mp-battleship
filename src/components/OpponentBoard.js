import React from 'react';
import {OpponentSquare} from './board_components/OpponentSquares'

export class OpponentBoard extends React.Component {

    createBoard = () => {
        const headerRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        let rows = [];
        let idCounter = 0;
        rows.push(<span key={"oLetter" + -1} id="boardEmptyLetter">0</span>);
        for (let i = 0; i < headerRow.length; i++) {
            rows.push(<span key={"oLetter" + i} className="boardLetters" >{headerRow[i]}</span>)
        }
        for (let i = 0; i < 10; i++) {
            let squares = [];

            for (let j = 0; j < 10; j++) {
                squares.unshift(<OpponentSquare key={j} id={"o" + (idCounter + j)} x={j} y={i} gameState={this.props.gameState[i][j]}/>);
            }

            idCounter += 10;
            rows.push(<p key={i}><span className="boardNumbers">{i + 1}</span> {squares}</p>);
        }

        return rows;
    };

    render() {
        return (
            <div id="opponent-board" className={this.props.playersTurn ? "notMyTurn" : "opponentTurn"}>
                {this.createBoard()}
            </div>
        )
    }
}