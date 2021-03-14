import { Subject, timer } from 'rxjs';

export class WebSocketService {
  currencyPair = 'btcusd';
  currencyArray = this.currencyPair.toUpperCase().match(/.{1,3}/g);
  order = {};
  websocketObservable = new Subject();
  ws = new WebSocket('wss://ws.bitstamp.net');

  constructor() {
    timer(0, 1000).subscribe(val => {
      this.websocketObservable.next(this.order)
    });
    const subscribe = {
      event: 'bts:subscribe',
      data: {
        channel: `order_book_${this.currencyPair}`
      }
    };

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
    };

    this.ws.onmessage = (event) => {
      this.order = JSON.parse(event.data).data;
    };

    this.ws.onclose = () => {
      this.ws.close();
    };
  }
}

const webSocketBean = new WebSocketService();
export default webSocketBean;