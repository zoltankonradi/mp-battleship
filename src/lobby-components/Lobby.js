import React from 'react';

export class Lobby extends React.Component {
    render() {
        return (
            <h1>{this.props.playerName}</h1>
        )
    }
}