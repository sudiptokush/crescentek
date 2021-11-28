import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel, SubsiteModel } from '../model/customer.model';

@Pipe({
  name: 'filterSubsite'
})
export class FilterSubsitePipe implements PipeTransform {

  transform(customerList: CustomerModel[], customerId: number, siteId: number) {
    return customerList.find(c=>c.id === customerId)?.sites.find(s=>s.id === siteId)?.subsite;
  }

}
