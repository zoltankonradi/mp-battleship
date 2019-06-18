import React from 'react';

export class PlayerSquare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };
    }

    handleClick = () => {
        if(this.state.clicked || !this.props.playersTurn) {
            return;
        }
        this.props.checkForHit(this.props.x, this.props.y);
        this.props.changePlayersTurn();
        this.setState({
            clicked: true
        });
    };

    render() {
        let squareContent;
        if (this.state.clicked) {
            if (this.props.opponentGameState[this.props.y][this.props.x] === 0 || this.props.opponentGameState[this.props.y][this.props.x] === 6) {
                squareContent = <i className="far fa-circle fa-lg"> </i>;
            } else {
                squareContent = <i className="fas fa-times fa-lg"> </i>;
            }
        } else {
            squareContent = '.';
        }
        return (
            <button className={`square ${this.state.clicked ? 'black' : 'white'}`} onClick={this.handleClick} id={this.props.id}>
                {squareContent}
            </button>
        )
    }
}