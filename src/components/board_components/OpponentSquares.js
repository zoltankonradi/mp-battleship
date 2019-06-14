import React from 'react';

export class OpponentSquare extends React.Component {
    render() {
        let squareContent;
        if (this.props.gameState >= 1 && this.props.gameState <=5) {
            squareContent = <i className="fas fa-square-full"> </i>;
        } else if(this.props.gameState === 6) {
            squareContent = <i className="far fa-circle fa-lg"> </i>;
        } else {
            squareContent = '.';
        }
        return (
            <button className={`square ${squareContent !== '.' ? 'black' : 'white'}`}>
                {squareContent}
            </button>
        )
    }
}