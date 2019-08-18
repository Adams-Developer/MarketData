import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { MarketPrice } from './market-price';
import { Subject, from } from  'rxjs';
import * as socketio from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MarketStatusService {

  private baseUrl =  'http://localhost:3000';

  constructor( private httpClient: HttpClient ) { }

  getInitialMarketStatus() {
    return this.httpClient.get<MarketPrice[]>(`${this.baseUrl}/api/market`);
  }

  //Socket.IO to get real-time capabilities 
  getUpdates() {
    //manager for socket.io endpoint at given url
    let socket = socketio(this.baseUrl);
    //create rxjs subject for multicasting
    let marketSub = new Subject<MarketPrice>();
    //Get observable from subject to listen to updates
    let marketSubObservable = from(marketSub);
    //Adds listener to market event
    socket.on('market', (marketStatus: MarketPrice) => {
      marketSub.next(marketStatus);
    });

    return marketSubObservable;
  }
  
}
