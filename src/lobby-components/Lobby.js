import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class Lobby extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            challengeModal: false,
        };
    }

    handleClose() {
        this.setState({ challengeModal: false });
    }

    handleShow() {
        this.setState({ challengeModal: true });
    }
    render() {
        const op = this.props.onlinePlayers;
        let players = [];
        for (let i = 0; i < op.length; i++) {
            if (op[i] === this.props.playerName) {
                players.push(<div key={"onlinePlayer" + i} className="lobby-player-name">{op[i]}</div>)
            } else {
                players.push(<div key={"onlinePlayer" + i} className="lobby-player-name">
                    <Button className="lobby-challenge-button" onClick={this.handleShow}>Challenge</Button>{op[i]}</div>)
            }
        }
        return (
            <>
                <div id="lobby-container">
                    <div id="lobby-player-count">
                        ONLINE PLAYERS: {op.length}
                    </div>
                    <div id="lobby-player-names">
                        {players}
                    </div>
                </div>
                <Modal show={this.state.challengeModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}