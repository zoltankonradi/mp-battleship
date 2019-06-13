import React from 'react';

export class LogWindow extends React.Component {
    render() {
        return (
            <div id="log-window">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
                <div id="status-window">
                    <h1>Ship status</h1>
                </div>
            </div>
        )
    }
}