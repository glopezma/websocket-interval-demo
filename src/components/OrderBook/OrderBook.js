import React from 'react';
import WebSocketService from './../../Services/socketService';
import './../../App.css';

class OrderBook extends React.Component {
  state = {
    orders: {}
  };

  componentDidMount() {
    WebSocketService.websocketObservable.subscribe(msg => {
      this.setState({ orders: msg });
    })
  }

  render() {
    const { bids, asks } = this.state.orders;
    const orderRows = (arr) =>
      arr &&
      arr.map((item, index) => (
        <tr key={index}>
          <td> {item[1]} </td>
          <td> {item[0]} </td>
        </tr>
      ));
    const orderHead = (title) => (
      <thead>
        <tr>
          <th colSpan="2">{title}</th>
        </tr>
        <tr>
          <th>Amount ({WebSocketService.currencyArray[0]})</th>
          <th>Price ({WebSocketService.currencyArray[1]})</th>
        </tr>
      </thead>
    );

    return (
      <div className="order-container">
        <table>
          {orderHead('Bids')}
          <tbody>{orderRows(bids)}</tbody>
        </table>

        <table>
          {orderHead('Asks')}
          <tbody>{orderRows(asks)}</tbody>
        </table>
      </div>
    );
  }
}

export default OrderBook;
