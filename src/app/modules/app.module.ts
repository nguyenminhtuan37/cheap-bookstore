// Source - https://stackoverflow.com/q/38942817
// Posted by Thorsten Westheider
// Retrieved 2026-08-11, License - CC BY-SA 3.0

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }  from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';

import { App }  from '../app';

import { 
    routing, 
    appRoutingProviders 
} from './app.routing';

@NgModule({
  imports:      [ BrowserModule, CommonModule, RouterModule ],
  declarations: [ App ],
  bootstrap:    [ App ],
  providers:    [ appRoutingProviders ]
})
export class AppModule { }
