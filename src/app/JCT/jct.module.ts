import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from '../app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from '../_helpers';
import { AccountService } from '../_services';
import { AppComponent } from '../app.component';
import { AlertComponent } from '../_components';
import { CheckinComponent } from '../JCT/checkin.component';
import { VIWSComponent } from '../JCT/viws.component';
import { JCTService } from '../_services/jct.service';
import { LayoutComponent } from './layout.component';
import { CheckinRoutingModule } from './jct-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({


  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckinRoutingModule  ],
  declarations: [
        LayoutComponent,
    CheckinComponent,
    VIWSComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [JCTService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class JCTModule { }
