import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const client = new window.Paho.MQTT.Client("192.168.1.249", 9001, "react-client");
client.connect({
    onSuccess: onConnect,
});

function onConnect(uri, reconnect) {
  console.log("CONNECTED");
	client.subscribe("test");
}


client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("ERROR CODE: " + responseObject.errorCode);
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}

function onMessageArrived(message) {
	console.log(message.payloadString);
	// this.setState({
	// 	payload: message.payloadString,
  // });
  ReactDOM.render(
    <React.StrictMode>
      <App payload= {message.payloadString}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// ReactDOM.render(
//     <React.StrictMode>
//         <Reciever client= {client}/>
//     </React.StrictMode>,
//       document.getElementById('root')
// );