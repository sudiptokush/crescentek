import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';

import { CustomerComponent } from './customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

import { FilterSubsitePipe } from 'src/app/pipe/filter-subsite.pipe';

@NgModule({
  declarations: [
    CustomerComponent,
    AddCustomerComponent,
    FilterSubsitePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Material
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    RouterModule.forChild([
      { path: '', component: CustomerComponent },
      { path: 'add', component: AddCustomerComponent }
    ]),
  ]
})
export class CustomerModule { }
