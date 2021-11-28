import { NgModule , ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {BrokerService} from './broker.service';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ]
})

export class BrokerModule {
    static forRoot() {
      return {
        ngModule: BrokerModule,
        providers: [BrokerService]
      };
    }
  }

