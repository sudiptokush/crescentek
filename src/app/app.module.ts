import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//Components
import { MenuComponent } from './templates/menu/menu.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Singleton service for State Maintainance
import { BrokerModule } from './broker/broker.module';

//Material
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SettingsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //Singleton service
    BrokerModule.forRoot(),

    //Bootstrap
    NgbModule,

    //Material
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
