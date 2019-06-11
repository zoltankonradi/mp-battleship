import React from 'react';
import {PlayerSquare} from "./board_components/PlayerSquares";

export class PlayerBoard extends React.Component {
    createBoard = () => {
        let rows = [];
        let idCounter = 0;

        for (let i = 0; i < 10; i++) {
            let squares = [];

            for (let j = 0; j < 10; j++) {
                squares.push(<PlayerSquare key={j} id={"p" + (idCounter + j)}/>);
            }

            idCounter += 10;
            rows.push(<p key={i}>{squares}</p>);
        }

        return rows;
    };

    render() {
        return (
            <div id="player-board" >
                {this.createBoard()}
            </div>
        )
    }
}
