import React from 'react';

export class OpponentSquare extends React.Component {
    render() {
        let squareContent;
        if (this.props.playerGameState >= 1 && this.props.playerGameState <=4) {
            squareContent = <i className="fas fa-square-full"> </i>;
        } else if(this.props.playerGameState === 5) {
            squareContent = <i className="fas fa-times fa-lg"> </i>;
        } else if(this.props.playerGameState === 6) {
            squareContent = <i className="far fa-circle fa-lg"> </i>;
        } else {
            squareContent = '.';
        }
        return (
            <button className={`square-opponent ${squareContent !== '.' ? 'black' : 'white'}`}>
                {squareContent}
            </button>
        )
    }
}