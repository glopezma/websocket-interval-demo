import { Subject, timer } from 'rxjs';

export class WebSocketService {
  currencyPair = 'btcusd';
  currencyArray = this.currencyPair.toUpperCase().match(/.{1,3}/g);
  order = {};
  websocketObservable = new Subject();
  ws = new WebSocket('wss://ws.bitstamp.net');

  constructor() {
    this.intervalSub = timer(0, 1000).subscribe(() => {
      this.websocketObservable.next(this.order);
    });

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({
        event: 'bts:subscribe',
        data: {
          channel: `order_book_${this.currencyPair}`
        }
      }));
    };

    this.ws.onmessage = (event) => {
      this.order = JSON.parse(event.data).data;
    };

    this.ws.onclose = () => { this.ws.close(); };
  }

  changeInterval = (timeInterval) => {
    console.log('change interval');
    this.intervalSub.unsubscribe();
    this.intervalSub = timer(0, timeInterval).subscribe(() => {
      this.websocketObservable.next(this.order);
    });
  }
}

const webSocketBean = new WebSocketService();
export default webSocketBean;