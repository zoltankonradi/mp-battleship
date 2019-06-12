import React from 'react';
import {OpponentSquare} from './board_components/OpponentSquares'

export class OpponentBoard extends React.Component {

    createBoard = () => {
        let rows = [];
        let idCounter = 0;

        for (let i = 0; i < 10; i++) {
            let squares = [];

            for (let j = 0; j < 10; j++) {
                squares.push(<OpponentSquare key={j} id={"o" + (idCounter + j)} x={j} y={i} gameState={this.props.gameState[i][j]}/>);
            }

            idCounter += 10;
            rows.push(<p key={i}>{squares}</p>);
        }

        return rows;
    };

    render() {
        return (
            <div id="opponent-board" >
                {this.createBoard()}
            </div>
        )
    }
}