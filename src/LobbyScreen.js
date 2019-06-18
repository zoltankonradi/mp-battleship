import React from 'react';
import {App} from './App';
import {Lobby} from "./lobby-components/Lobby";
import SocketIOClient from 'socket.io-client';

export class LobbyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.challengePlayer = this.challengePlayer.bind(this);
        this.declineChallenge = this.declineChallenge.bind(this);
        this.changeChallengeDeclined = this.changeChallengeDeclined.bind(this);
        this.challengeAccepted = this.challengeAccepted.bind(this);
        this.state = {
            socket: SocketIOClient("http://localhost:3001"),
            socketIds: [],
            onlinePlayers: [],
            playerOpponent: "",
            opponentId: "",
            challenged: false,
            challengeDeclined: false,
            challengeReceived: false,
            inGame: false
        }
    }

    /////// SERVER COMMUNICATION ///////
    componentDidMount() {
        const socket = this.state.socket;
        socket.emit('new user', this.props.playerName);
        socket.on('get users', (data) => {
            this.updateUsers(data);
        });
        socket.on('get challenge', (data) => {
            this.setState({
                playerOpponent: data.opponentName,
                opponentId: data.opponentId,
                challengeReceived: true
            })
        });
        socket.on('challenge declined', () => {
            this.setState({
                challenged: false,
                challengeDeclined: true
            })
        });
        socket.on('accepted', (data) => {
            this.setState({
                playerOpponent: data.opponentName,
                opponentId: data.opponentId,
                inGame: true
            })
        })
    }

    updateUsers = (data) => {
        this.setState({
            socketIds: data.socketIds,
            onlinePlayers: data.onlinePlayers
        })
    };

    challengePlayer = (opponentId) => {
        this.setState({
            challenged: true
        });
        this.state.socket.emit('challenge', opponentId);
    };

    declineChallenge = () => {
        this.state.socket.emit('decline challenge', this.state.opponentId);
        this.setState({
            challenged: false,
            playerOpponent: "",
            opponentId: "",
            challengeReceived: false
        })
    };

    changeChallengeDeclined = () => {
        this.setState({
            challengeDeclined: false
        })
    };

    challengeAccepted = () => {
        this.state.socket.emit('challenge accepted', this.state.opponentId);
        this.setState({
            inGame: true
        })
    };

    render() {
        return (
            <>
                {this.state.inGame ? <App challenged={this.state.challenged} socket={this.state.socket} opponentId={this.state.opponentId} playerOpponent={this.state.playerOpponent}/> :
                    <div className="lobby-screen">
                        <Lobby challengePlayer={this.challengePlayer}
                               playerName={this.props.playerName}
                               onlinePlayers={this.state.onlinePlayers}
                               socketIds={this.state.socketIds}
                               challengeReceived={this.state.challengeReceived}
                               declineChallenge={this.declineChallenge}
                               playerOpponent={this.state.playerOpponent}
                               challengeDeclined={this.state.challengeDeclined}
                               changeChallengeDeclined={this.changeChallengeDeclined}
                               challengeAccepted={this.challengeAccepted}
                        />
                    </div>
                }
            </>
        )
    }
}