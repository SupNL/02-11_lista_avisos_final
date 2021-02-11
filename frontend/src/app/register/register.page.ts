import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { PasswordValidator } from '../validators/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public form : FormGroup;
  public validationMessages = {
    'nome': [
      { type: 'required', message: 'Nome é obrigatório.' },
    ],
    'login': [
      { type: 'required', message: 'Nome de usuário é obrigatório.' },
      { type: 'dupedLogin', message: 'Nome de usuário já existente.' },
    ],
    'senha': [
      { type: 'required', message: 'Senha é obrigatória.' }
    ],
    'confirmaSenha': [
      { type: 'required', message: 'Confirme a senha.' },
      { type: 'notEqual', message: 'Senhas precisam ser iguais.' }
    ]
  };

  constructor(
    private formBuilder : FormBuilder,
    private api : ApiService,
    private navController : NavController,
    private toastController : ToastController
  ) {
    this.form = this.formBuilder.group({
      nome : ["", [
        Validators.required,
      ]],
      login : ["", [
        Validators.required,
        (control : AbstractControl) => {
          if(control.touched)
            return null;
        } // apenas para limpar em caso de conflito
      ]],
      nivel : ["comum", [
        Validators.required,
      ]],
      senha : ["", [
        Validators.required,
      ]],
      confirmaSenha : ["", [
        Validators.required,
      ]]
    },
    {
      validator : PasswordValidator.areEqual("senha", "confirmaSenha")
    } as AbstractControlOptions);
  }

  navigateBack() {
    this.navController.navigateBack([".."]);
  }

  submitForm() {
    const user = {
      nome : this.form.get('nome').value,
      login : this.form.get('login').value,
      senha : this.form.get('senha').value,
      nivel : this.form.get('nivel').value
    }
    this.api.registerAccount(user)
    .then(() => {
      this.toastController.create({
        message : "Conta criada com sucesso.",
        duration : 2000
      }).then(toast => {
        toast.present();
        this.navController.navigateRoot(["/login"]);
      })
    })
    .catch((err) => {
      if(err.status == 409) {
        this.form.get('login').setErrors({ "dupedLogin" : true });
      }
    })
  }
}
