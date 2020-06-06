import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { AppComponent } from './app.component';

import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownItemComponent } from './dropdown/dropdown-item/dropdown-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    DropdownItemComponent,
  ],
  imports: [
    BrowserModule,
    PortalModule,
    CommonModule,
    FormsModule,
    OverlayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
