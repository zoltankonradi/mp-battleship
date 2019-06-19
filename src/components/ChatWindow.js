import React from 'react';

export class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.changeMessage = this.changeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.state = {
            keyCounter: 0,
            opponentMessage: "",
            message: "",
            messages: [
                <p key="dummy6" className="chat-p" >.</p>,
                <p key="dummy7" className="chat-p" >.</p>,
                <p key="dummy8" className="chat-p" >.</p>,
                <p key="dummy9" className="chat-p" >.</p>,
                <p key="dummy10" className="chat-p" >.</p>,
            ]
        }
    }

    componentDidMount() {
        const socket = this.props.socket;
        socket.on('get message', (data) => {
            this.setState({
                opponentMessage: data.newMessage
            })
        });
    }

    addMessage = (player) => {
        if (player) {
            const newMessage = this.state.message;
            const messages = this.state.messages;
            let key = this.state.keyCounter;

            messages.push(<p key={key++} className="chat-message-player">{newMessage + "   "}<span className="chat-player-name">{":" + this.props.playerName}</span></p>);
            this.setState({ keyCounter: key });
            if (messages.length > 5) {
                messages.shift();
            }
            this.setState({
                message: "",
                messages: messages
            });
        } else {
            const newMessage = this.state.opponentMessage;
            const messages = this.state.messages;
            let key = this.state.keyCounter;
            messages.push(<p key={key++} className="chat-message-opponent"><span className="chat-opponent-name">{this.props.playerOpponent + ":"}</span>{"   " + newMessage}</p>);
            this.setState({ keyCounter: key });
            if (messages.length > 5) {
                messages.shift();
            }
            this.setState({
                opponentMessage: "",
                messages: messages
            });
        }

    };

    sendMessage = (e) => {
        e.preventDefault();
        if (this.state.message === "") { return; }
        const socket = this.props.socket;
        socket.emit('send message', { newMessage: this.state.message, opponentId: this.props.opponentId });
        this.addMessage(true);
    };

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    };

    handleKeyPress = (e) => {
        if (this.state.message === "") { return; }
        if(e.key === 'Enter'){
            this.addMessage(true);
        }
    };

    render() {
        if (this.state.opponentMessage !== "") {
            this.addMessage(false);
        }
        return (
            <div id="chat-window">
                <div id="chat-title">
                    Chat
                </div>
                <div id="chat-messages">
                    {this.state.messages}
                </div>
                <div className="chat-functions">
                    <form onSubmit={this.sendMessage} id="chat-form">
                        <input onChange={this.changeMessage} value={this.state.message} type="text" id={this.state.message === "" ? "chat-text-area-disabled" : "chat-text-area-active"}></input>
                        <input onKeyPress={this.handleKeyPress} id={this.state.message === "" ? "chat-button-disabled" : "chat-button-active"} type="submit" value="Send"></input>
                    </form>
                </div>
            </div>
        )
    }
}