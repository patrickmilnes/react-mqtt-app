import React from 'react';
import App from './App';

class Reciever extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: null,
            client: props.client,
        }
        this.state.client.onMessageArrived = this.onMessageArrived;
    }

    onMessageArrived(message) {
        console.log(message.payloadString);
        this.setState({
        	payload: message.payloadString,
        });
    }

    onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("ERROR CODE: " + responseObject.errorCode);
            console.log("onConnectionLost:"+responseObject.errorMessage);
        }
    }

    render() {
        const payload = this.state.payload;
        return (
            <App payload= {payload}/>
        );
    }
}

export default Reciever;
