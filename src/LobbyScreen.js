import React from 'react';
import {App} from './App';
import {Lobby} from "./lobby-components/Lobby";
import SocketIOClient from 'socket.io-client';


export class LobbyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endPoint: "http://localhost:3001",
            playerOpponent: "",
            inGame: false
        }
    }

    /////// SERVER COMMUNICATION ///////
    componentDidMount() {
        const socket = SocketIOClient(this.state.endPoint);
        socket.emit("gameState", this.props.playerName);
    }

    render() {
        return (
            <div className="lobby-screen">
                {this.state.inGame ? <App /> : <Lobby playerName={this.props.playerName} />}
            </div>
        )
    }
}