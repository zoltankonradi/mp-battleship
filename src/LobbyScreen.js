import React from 'react';
import {App} from './App';
import {Lobby} from "./lobby-components/Lobby";
import SocketIOClient from 'socket.io-client';

export class LobbyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.challengePlayer = this.challengePlayer.bind(this);
        this.state = {
            playerId: "",
            onlinePlayers: [],
            endPoint: "http://localhost:3001",
            playerOpponent: "",
            challenged: false,
            inGame: false
        }
    }

    /////// SERVER COMMUNICATION ///////
    componentDidMount() {
        const socket = SocketIOClient(this.state.endPoint);
        socket.emit('new user', this.props.playerName);
        socket.on('get users', (data) => {
            this.updateUsers(data);
        });
        socket.on('get id', (data) => {
            this.setState({ playerId: data })
        })
    }

    updateUsers = (data) => {
        this.setState({
            onlinePlayers: data
        })
    };

    challengePlayer = () => {
        this.setState({
            challenged: true
        })
    };

    render() {
        return (
            <div className="lobby-screen">
                {this.state.inGame ?
                    <App playerOpponent={this.state.playerOpponent}/>
                    :
                    <Lobby challengePlayer={this.challengePlayer} playerName={this.props.playerName} onlinePlayers={this.state.onlinePlayers}/>
                }
            </div>
        )
    }
}