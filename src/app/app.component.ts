import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerData } from 'src/data/customer.data';

import { BrokerService } from './broker/broker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crescentek';

  constructor(private brokerService: BrokerService, public router: Router) {
    // Getting data and saving in singleton service
    this.brokerService.customerList = CustomerData;
  }
}
