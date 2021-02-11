import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from '../services/admin-guard.service';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'tabs',
  },
  {
    path : 'tabs',
    component: HomePage,
    children : [
      {
        path: 'list-posts',
        children : [
          {
            path : '',
            loadChildren: () => import('./list-posts/list-posts.module').then( m => m.ListPostsPageModule)
          }
        ]
      },
      {
        path: 'new-post',
        children : [
          {
            path : '',
            loadChildren: () => import('./new-post/new-post.module').then( m => m.NewPostPageModule)
          }
        ]
      },
      {
        path: 'pending-posts',
        children : [
          {
            path : '',
            loadChildren: () => import('./pending-posts/pending-posts.module').then( m => m.PendingPostsPageModule),
            canActivate : [AdminGuardService]
          }
        ]
      },
      {
        path: '',
        redirectTo : 'list-posts',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
