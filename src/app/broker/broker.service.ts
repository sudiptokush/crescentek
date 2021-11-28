import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import { filter } from 'rxjs/operators';
import { CustomerModel } from '../model/customer.model';

@Injectable()
export class BrokerService {

  // Global Variables
  customerList : CustomerModel[] = []; 
  // Global Variables

  subject: Subject < any >;


  constructor() {
    this.subject = new Subject();
  }

  // Methods are used for passing value between unrelated components
  public emit(key: string, options?: any) {
    this.subject.next({id: key, data: options});
  }

  public filterOn(id: string): Observable < any > {
    return(this.subject.pipe(filter(d => (d.id === id))));
  }
  // ----------------------------------------------------------------
}
