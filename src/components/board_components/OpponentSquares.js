import React from 'react';

export class OpponentSquare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: []
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let squareContent;

        if (this.props.gameState === 1) {
            squareContent = 'X';
        } else if(this.props.gameState === 2) {
            squareContent = 'O';
        } else {
            squareContent = '.';
        }

        return (
            <button className={`square ${squareContent !== '.' ? 'black' : 'white'}`} id={this.props.id}>
                {squareContent}
            </button>
        )
    }
}