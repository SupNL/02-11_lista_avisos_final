import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage {

  public form : FormGroup;
  public validationMessages = {
    'message': [
      { type: 'required', message: 'Mensagem obrigatória.' },
    ],
  };
  public showMore = true;

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    private toastController : ToastController,
    private photoService : PhotoService
  ) {
    this.form = this.formBuilder.group({
      message : ["", [
        Validators.required,
      ]],
      type : ["suggestion"],
    });
  }

  public toggleShowMore() {
    this.showMore = !this.showMore;
  }

  public removeLastPhoto() {
    this.photoService.photos.shift();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  submitForm() {
    const data = {
      message : this.form.get('message').value,
      type : this.form.get('type').value,
    }
    this.api.uploadPost(data, this.photoService.photos)
    .then(() => {
      this.toastController.create({
        message : "Aviso criado com sucesso. Um moderador aprovará seu aviso.",
        duration : 5000,
        position : "middle"
      }).then(toast => {
        toast.present();
        this.form.reset();
        this.photoService.photos = [];
      })
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

}
