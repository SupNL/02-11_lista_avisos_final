import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public form : FormGroup;
  public validationMessages = {
    'username': [
      { type: 'required', message: 'Nome de usuário é obrigatório.' },
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthenticationService,
    private navController : NavController,
    public toastController : ToastController
  ) {
    this.form = this.formBuilder.group({
      username : ["", [
        Validators.required,
      ]],
      password : ["", [
        Validators.required,
      ]]
    });
  }

  public navigateToRegister() {
    this.navController.navigateRoot(["/register"]);
  }

  async presentToast(message : string, duration : number) {
    const toast = await this.toastController.create({
      message, duration
    });
    toast.present();
  }

  submitForm() {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    this.authService.login(username, password)
    .then(() => {
      this.form.reset();
      this.navController.navigateForward(["/home"]);
    })
    .catch(err => {
      this.presentToast(err.message, 3000);
    })
  }
}