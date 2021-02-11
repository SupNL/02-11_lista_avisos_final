import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PostInterface } from 'src/app/interfaces/interface.post';
import { ApiService } from 'src/app/services/api.service';
import { PostViewService } from 'src/app/services/post-view.service';

@Component({
  selector: 'app-pending-posts',
  templateUrl: './pending-posts.page.html',
  styleUrls: ['./pending-posts.page.scss'],
})
export class PendingPostsPage {

  public postList : PostInterface[];
  public showMore : number[];

  constructor(
    private loadingController : LoadingController,
    private api : ApiService,
    public postService : PostViewService
  ) {
    this.showMore = []
  }  

  ionViewDidEnter() {
    this.loadPosts();
  }

  public approvePost(id : number) {
    this.presentLoading("Aprovando...")
    .then(() => {
      return this.api.approvePost(id);
    })
    .then(() => {
      this.postList = this.postList.filter(post => {
        return post.id != id;
      });
    })
    .finally(() => {
      this.dismissLoading();
    })
  }

  public removePost(id : number) {
    this.presentLoading("Removendo...")
    .then(() => {
      return this.api.removePost(id);
    })
    .then(() => {
      this.postList = this.postList.filter(post => {
        return post.id != id;
      });
    }) 
    .finally(() => {
      this.dismissLoading();
    })
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

  presentLoading(message : string) {
    return new Promise<void>(resolve => {
      this.loadingController.create({ message })
      .then(loading => {
        loading.present();
        resolve();
      })
    })
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  loadPosts() {
    this.presentLoading("Carregando avisos...").then(() => {
      return this.api.getPosts("approved=false");
    })
    .then(requestedPosts => {
      this.postList = requestedPosts;
    })
    .finally(() => {
      this.dismissLoading();
    })
  }

}
