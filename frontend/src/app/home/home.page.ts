import { ChangeDetectorRef, Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private toastController : ToastController,
    private auth : AuthenticationService,
    private navController : NavController,
    private changeDetector : ChangeDetectorRef
  ) {}

  public ionViewWillEnter() {
    this.changeDetector.detectChanges();
  }

  public getUserLevel() {
    return this.auth.getUserLevel();
  }

  public logout() {
    this.auth.logout();
    this.toastController.create({
      message : "Desconectado com sucesso.",
      duration: 3000
    }).then(toast => {
      toast.present();
    });
    this.navController.navigateRoot(["/login"]);
  }

}
