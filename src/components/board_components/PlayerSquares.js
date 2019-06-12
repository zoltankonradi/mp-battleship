import React from 'react';

export class PlayerSquare extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        if(this.state.clicked) {
            return;
        }
        this.setState({
            clicked: true
        });
        this.props.changeGameState(this.props.y, this.props.x);
    };

    render() {
        return (
            <button className={`square ${this.state.clicked ? 'black' : 'white'}`} onClick={this.handleClick} id={this.props.id}>
                {this.state.clicked ? 'X' : '.'}
            </button>
        )
    }
}