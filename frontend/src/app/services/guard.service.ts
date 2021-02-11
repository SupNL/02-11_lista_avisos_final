import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    public authService : AuthenticationService,
    private navController : NavController,
  ) { }

  public canActivate() : Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.authService.isAuthenticated()
      .then(isAuthenticated => {
        if(!isAuthenticated)
          this.navController.navigateRoot(['/login']);
        resolve(isAuthenticated);
      });
    })
  }
}
