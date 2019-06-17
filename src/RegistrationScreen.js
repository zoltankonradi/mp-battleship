import React from 'react';
import {LobbyScreen} from './LobbyScreen';
import './style/game.css'

export class RegistrationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: "",
            nameAdded: false
        }
    }

    changeName = (e) => {
        this.setState({
            playerName: e.target.value
        })
    };

    changeScreen = (e) => {
        e.preventDefault();
        if (this.state.playerName === "") {
            return;
        }
        this.setState({
            nameAdded: true
        });
    };

    render() {
        return (
            <div id="registration-screen">
                {this.state.nameAdded ? <LobbyScreen playerName={this.state.playerName} /> :
                    <div id="registration-container">
                        <form onSubmit={this.changeScreen} id="registration-form">
                            <div id="registration-title">BATTLESHIP</div>
                            <input id={this.state.playerName === "" ? "registration-input-disabled" : "registration-input-active"} onChange={this.changeName} placeholder="Your name" type="text"></input>
                            <input id={this.state.playerName === "" ? "registration-button-disabled" : "registration-button-active"} type="submit" value="Continue"></input>
                        </form>
                    </div>
                }
            </div>
        );
    }
}