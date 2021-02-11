import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingPostsPageRoutingModule } from './pending-posts-routing.module';

import { PendingPostsPage } from './pending-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingPostsPageRoutingModule
  ],
  declarations: [PendingPostsPage]
})
export class PendingPostsPageModule {}
