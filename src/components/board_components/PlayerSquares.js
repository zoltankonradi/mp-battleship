import React from 'react';

export class PlayerSquare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };
    }

    handleClick = () => {
        if(this.state.clicked) {
            return;
        }
        this.setState({
            clicked: true
        });
        this.props.checkForHit(this.props.x, this.props.y);
        this.props.changePlayersTurn();
    };

    render() {
        let squareContent;
        if (this.state.clicked) {
            if (this.props.gameState[this.props.y][this.props.x] === 0) {
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