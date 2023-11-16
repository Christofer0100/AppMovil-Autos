import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RcontrasennaPageRoutingModule } from './rcontrasenna-routing.module';

import { RcontrasennaPage } from './rcontrasenna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RcontrasennaPageRoutingModule
  ],
  declarations: [RcontrasennaPage]
})
export class RcontrasennaPageModule {}
