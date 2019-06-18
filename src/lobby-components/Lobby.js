import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class Lobby extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleCloseChallengedModal = this.handleCloseChallengedModal.bind(this);
        this.handleCloseChallengeModal = this.handleCloseChallengeModal.bind(this);
        this.handleShowChallengeModal = this.handleShowChallengeModal.bind(this);
        this.state = {
            challengeModal: false
        };
    }

    handleClick = (opponentId) => {
        this.props.challengePlayer(opponentId);
        this.handleShowChallengeModal();
    };

    handleCloseChallengeModal() {
        this.setState({ challengeModal: false });
    }

    handleShowChallengeModal() {
        this.setState({ challengeModal: true });
    }

    handleCloseChallengedModal() {
        this.props.declineChallenge();
    }

    render() {
        const op = this.props.onlinePlayers;
        let players = [];
        for (let i = 0; i < op.length; i++) {
            if (op[i] === this.props.playerName) {
                players.push(<div key={"onlinePlayer" + i} className="lobby-player-name">{op[i]}</div>)
            } else {
                players.push(<div key={"onlinePlayer" + i} className="lobby-player-name">
                                <button className="lobby-challenge-button" onClick={() => this.handleClick(this.props.socketIds[i])}>
                                    Challenge
                                </button>
                                {op[i]}
                            </div>)
            }
        }
        if (this.props.challengeDeclined) {
            this.handleCloseChallengeModal();
            this.props.changeChallengeDeclined();
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
                <Modal show={this.state.challengeModal} onHide={this.handleCloseChallengeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Request sent</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Waiting for response...</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseChallengeModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.props.challengeReceived} onHide={this.handleCloseChallengedModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Challenge received from {this.props.playerOpponent}!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Waiting for response...</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseChallengedModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.props.challengeAccepted}>
                            Accept
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}