import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    public authService : AuthenticationService,
    private navController : NavController,
  ) { }

  public canActivate() : Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if(this.authService.getUserLevel() == "admin"){
        resolve(true);
      } else {
        this.navController.navigateRoot(['/home']);
        resolve(false);
      }
    })
  }

}
