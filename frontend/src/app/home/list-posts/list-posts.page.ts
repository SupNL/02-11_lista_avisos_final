import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PostInterface } from 'src/app/interfaces/interface.post';
import { ApiService } from 'src/app/services/api.service';
import { PostViewService } from 'src/app/services/post-view.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.page.html',
  styleUrls: ['./list-posts.page.scss'],
})
export class ListPostsPage {

  public postList : PostInterface[]
  public showMore : number[];

  constructor(
    private loadingController : LoadingController,
    private api : ApiService,
    public postService : PostViewService
  ) { 
    this.showMore = [];
  }  

  ionViewDidEnter() {
    this.loadPosts();
  }

  public toggleShowMore(id : number) {
    if(this.showMore.includes(id)){
      this.showMore = this.showMore.filter(containedId => {
        return containedId != id;
      })
    } else {
      this.showMore.push(id);
    }
  }

  presentLoading() {
    return new Promise<void>(resolve => {
      this.loadingController.create({
        message : "Carregando avisos..."
      }).then(loading => {
        loading.present();
        resolve();
      })
    })
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  loadPosts() {
    this.presentLoading().then(() => {
      return this.api.getPosts();
    })
    .then(requestedPosts => {
      this.postList = requestedPosts;
    })
    .finally(() => {
      this.dismissLoading();
    })
  }
}
