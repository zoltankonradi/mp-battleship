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
        this.props.changeGameState(this.props.y, this.props.x);
        this.props.changePlayersTurn();
    };

    render() {
        return (
            <button className={`square ${this.state.clicked ? 'black' : 'white'}`} onClick={this.handleClick} id={this.props.id}>
                {this.state.clicked ? <i className="fas fa-times fa-lg"> </i> : <i className="fas fa-circle"> </i>}
            </button>
        )
    }
}