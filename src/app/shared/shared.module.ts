import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
      HeaderComponent, SidenavComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule
  ],
  exports: [ HeaderComponent, SidenavComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
