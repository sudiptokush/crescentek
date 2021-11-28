import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators, FormGroupDirective} from '@angular/forms';

import {emailRegex, nameRegex} from 'src/app/helper/regex';
import {patternValidator} from 'src/app/helper/validators';
import { BrokerService } from 'src/app/broker/broker.service';
import { CustomerModel, SiteModel, SubsiteModel } from 'src/app/model/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  @ViewChild('siteFormSubmit') button: any; 
  show: string = "Customer";
  IsBusiness: string = 'Yes';
  showSiteDropdown = false;
  siteDropdownList :SiteModel[] | undefined;
  selectedSiteId: number = 0; 

  customerId: number = 0;

  customerForm!: FormGroup;
  siteForm!: FormGroup;
  subsiteForm!: FormGroup;

  constructor(private router: Router, public broker: BrokerService) { }

  ngOnInit(): void {
    this.initializeCompanyInfoForm();
    this.initializeAddSiteForm();
    this.initializeAddSubsiteForm();
  }

  // Customer Info
  addCustomer() {
    this.show = "Customer";
  }

  IsBusinessAccount(val : string) {
    this.IsBusiness = val;
    this.formCustomerInfoControls.isBusiness.setValue(val);
  }

  initializeCompanyInfoForm() {
    this.customerForm = new FormGroup({
      id: new FormControl(this.broker.customerList.length + 1),
      customerName: new FormControl('', [Validators.required, patternValidator(nameRegex)]),
      contactPerson: new FormControl('', [Validators.required, patternValidator(nameRegex)]),
      phoneNo: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, patternValidator(emailRegex)]),
      isBusiness: new FormControl('Yes')
    });
  }

  public customerHasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }

  get formCustomerInfoControls() { return this.customerForm.controls; }

  customerList() {
    this.router.navigate(['customer']);
  }

  submitCustomerInfo() {
    
    // Check if form is valid
    if (this.customerForm.valid) {

      const customerObj : CustomerModel = this.customerForm.getRawValue();

      this.customerId = customerObj.id;

      // Adding it in customer list
      customerObj.status = 'Pending';
      customerObj.sites = [];
      customerObj.isBusiness = this.IsBusiness;
      this.broker.customerList.push(customerObj);

      // Resetting the form
      this.customerForm.reset();
      // --------------------

      // Set id value for the resetted form
      this.formCustomerInfoControls.id.setValue(this.broker.customerList.length + 1);
      // ----------------------------------

      // Resetting the toggle button
      this.IsBusiness = 'Yes';
      // ----------------------

      this.show = 'Site';
      this.showSiteDropdown = false;
      
    }
  }
  // ---------------------


  // Site
  addSite() {
    
    if(this.customerId === 0) {
      alert('Please add a customer first');
    } else {
      this.show = "Site";
      this.button.nativeElement.click();
    }
  }

  get formSiteControls() { return this.siteForm.controls; }

  public siteHasError = (controlName: string, errorName: string) => {
    return this.siteForm.controls[controlName].hasError(errorName);
  }

  initializeAddSiteForm() {
    const siteId = this.broker.customerList.find(c=>c.id === this.customerId)?.sites.length;
    this.siteForm = new FormGroup({
      id: new FormControl( siteId ? siteId : 0 + 1),
      siteName: new FormControl('', [Validators.required, patternValidator(nameRegex)]),
      firstAddress: new FormControl('', [Validators.required]),
      street: new FormControl(''),
      city: new FormControl(''),
      zipcode: new FormControl(''),
      country: new FormControl(''),
      description: new FormControl('')
    });
  }

  submitSite() {
    if(this.customerId === 0) {
      alert('Please add a customer first');
    } else {
      if(this.show !== 'Site') {
        this.show = "Site";
      } else {
        // Check if form is valid
        if (this.siteForm.valid) {
          const siteObj : SiteModel = this.siteForm.getRawValue();
          // Adding it in customer list
          siteObj.subsite = [];
          this.broker.customerList.find(c=>c.id === this.customerId)?.sites.push(siteObj);
          this.selectedSiteId = this.siteForm.getRawValue().id;
          // Resetting the forms
          this.siteForm.reset();
          // --------------------

          // Set id value for the resetted form
          const siteId = this.broker.customerList.find(c=>c.id === this.customerId)?.sites.length;
          this.formSiteControls.id.setValue(siteId ? siteId + 1 : 0 + 1);
          // ----------------------------------

          this.siteDropdownList = this.broker.customerList.find(c=>c.id === this.customerId)?.sites;
          this.showSiteDropdown = true;
        } else {
          this.siteForm.markAllAsTouched();
        }
      }
    }
  }
  // -------------------------

  // Subsite
  addSubsite() {
    this.show = "Subsite";
  }

  public subsiteHasError = (controlName: string, errorName: string) => {
    return this.subsiteForm.controls[controlName].hasError(errorName);
  }

  get formSubsiteControls() { return this.subsiteForm.controls; }

  initializeAddSubsiteForm() {
    const subsiteId = this.broker.customerList.find(c=>c.id === this.customerId)?.sites.find(s=>s.id === this.selectedSiteId)?.subsite.length;
    this.subsiteForm = new FormGroup({
      id: new FormControl(subsiteId ? subsiteId + 1 : 0 + 1),
      label: new FormControl(''),
      floor: new FormControl(''),
      status: new FormControl(''),
      description: new FormControl('')
    });
  }

  submitSubsite() {
    if (this.subsiteForm.valid) {
      const subsiteObj : SubsiteModel = this.subsiteForm.getRawValue();
      const subsiteId = this.broker.customerList.find(c=>c.id === this.customerId)?.sites.find(s=>s.id === this.selectedSiteId)?.subsite.length;
      
      subsiteObj.id = subsiteId ? subsiteId + 1 : 0 + 1;

      this.broker.customerList.find(c=>c.id === this.customerId)?.sites.find(s=>s.id === this.selectedSiteId)?.subsite.push(subsiteObj);
    
      this.subsiteForm.reset();

      console.log(this.broker.customerList);
      alert("check console for final object");
    }
  }
  // ---------------

  //User
  addUser() {
   this.show = "User" 
  }
}
