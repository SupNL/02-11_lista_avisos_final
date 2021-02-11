import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  
  constructor(
    private auth: AuthenticationService,
    private toastControler : ToastController,
    private navController : NavController,
  ) { }

  presentToast(message : string) {
    this.toastControler.create({
      message,
      duration : 5000
    }).then(toast => {
      toast.present();
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status == 401) { // token expirou ou nao definido
          this.auth.logout();
          this.presentToast("A sua sessão expirou. Realize o login novamente.");
          this.navController.navigateRoot(["/login"]);
        } else {
          this.presentToast("Ocorreu um erro inesperado.");
        }
        return throwError(error);
      })
    );
  }
}