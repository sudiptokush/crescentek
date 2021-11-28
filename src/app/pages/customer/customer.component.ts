import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

// Material
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

//Confirmation Box
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationBoxComponent} from 'src/app/popup/confirmation-box/confirmation-box.component';

// Model
import { CustomerModel } from "src/app/model/customer.model";

// Service
import { BrokerService } from 'src/app/broker/broker.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements AfterViewInit {

  displayedColumns : string[] = ['customerName', 'contactPerson', 'phoneNo', 'emailAddress', 'noOfSites', 'status', 'action']
  customerList = new MatTableDataSource<CustomerModel>(this.brokerService.customerList);
  keyword: string = '';
  status: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private brokerService: BrokerService, private router: Router, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.customerList.paginator = this.paginator;
  }

  addCustomer() {
    this.router.navigate(['customer/add']);
  }

  deleteCustomer(id: number) {
    const confirmationPopup = this.dialog.open(ConfirmationBoxComponent, {
      data: 'Are you sure you want to delete the customer ?'
    });
    confirmationPopup.afterClosed().subscribe(result => {
      // User selected OK
      if (result) {
        this.customerList.data = this.customerList.data.filter(c=>c.id !== id);
      }
    });
  }

  searchKeyword(event: any) {

    // Note: Since data is available locally I am not implementing delay. If data is fetched from Server 
    // I would be implementing delay to decrease the number of server call.
    this.searchGrid();
  }

  searchStatus(event: any) {
    this.searchGrid();
  }

  // Keyword is matched with Customer Name, Contact person, Phone No, Email Address, No Of Sites
  searchGrid() {
    const keywordInLowerCase = this.keyword.toLowerCase();
    this.status = this.status === 'All' ? '' : this.status;
    if(this.keyword !== '' && this.status !== '') {
      this.customerList.data = [...this.brokerService.customerList.filter( customer => 
                                            customer.customerName.toLowerCase().includes(keywordInLowerCase) || 
                                            customer.contactPerson.toLowerCase().includes(keywordInLowerCase) ||
                                            customer.phoneNo.toLowerCase().includes(keywordInLowerCase) ||
                                            customer.emailAddress.toLowerCase().includes(keywordInLowerCase) ||
                                            customer.noOfSites.toString() === this.keyword &&
                                            customer.status === this.status
                              )]; 
    }
    if(this.keyword !== '' && this.status === '') {
      this.customerList.data = [...this.brokerService.customerList.filter( customer => 
                                            customer.customerName.toLowerCase().includes(keywordInLowerCase) || 
                                            customer.contactPerson.toLowerCase().includes(keywordInLowerCase) ||
                                            customer.phoneNo.toLowerCase().includes(keywordInLowerCase) ||
                                            customer.emailAddress.toLowerCase().includes(keywordInLowerCase) ||
                                            customer.noOfSites.toString() === this.keyword
                                    )]; 
    }
    if(this.keyword === '' && this.status !== '') {
      this.customerList.data = [...this.brokerService.customerList.filter( customer => 
                                            customer.status === this.status
                                    )]; 
    }
    if(this.keyword === '' && this.status === '') {
      this.customerList.data = [...this.brokerService.customerList]
    }
  }

}
