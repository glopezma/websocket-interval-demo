import React, { Component } from 'react';
import WebSocketService from './Services/socket.service';
import OrderBook from './components/OrderBook/OrderBook';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Crypto Order Book </h2>
        <button onClick={() => WebSocketService.changeInterval(1)}>1 nano second interval</button>
        <button onClick={() => WebSocketService.changeInterval(1000)}>1 second interval</button>
        <button onClick={() => WebSocketService.changeInterval(5000)}>5 second interval</button>
        <OrderBook />
      </div>
    );
  }
}

export default App;
