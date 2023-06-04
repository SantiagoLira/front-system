import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { FormsModule } from '@angular/forms';
import { RecursosComponent } from './recursos/recursos.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceGeneralComponent,
    RecursosComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
