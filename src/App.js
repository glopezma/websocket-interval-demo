import React, { Component } from 'react';
import OrderBook from './components/OrderBook/OrderBook';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Crypto Order Book </h2>
        <OrderBook />
      </div>
    );
  }
}

export default App;
