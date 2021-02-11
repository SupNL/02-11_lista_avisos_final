import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated : boolean;
  private userLevel : string;

  constructor(
    private storage : StorageService,
    private api : ApiService
  ) { }

  public getUserLevel() : string {
    return this.userLevel;
  }
  
  public login(username : string, password : string) : Promise<void> {
    let user : any;
    return new Promise((resolve, reject) => {
      this.api.login(username, password)
      .then((success : any) => {
        user  = jwt_decode(success.token);
        this.storage.save("token", success.token);
      })
      .then(() => {
        this.userLevel = user.nivel;
        this.authenticated = true;
        resolve();
      })
      .catch(err => {
        this.authenticated = false;
        reject(err);
      })
    })
  }

  public logout() {
    this.storage.remove("token").then(() => {
      this.authenticated = false;
    });
  }

  public getToken() : Promise<string> {
    return new Promise((resolve) => {
      this.storage.load("token")
      .then(token => {
        resolve(token);
      });
    });
  }

  public isAuthenticated() : Promise<boolean> {
    return new Promise((resolve) => {
      if(this.authenticated == undefined) {
        this.storage.load("token")
        .then(token => {
          if(token){
            const user : any = jwt_decode(token);
            this.userLevel = user.nivel;
            this.authenticated = true;
          }else{
            this.authenticated = false;
          }
          resolve(this.authenticated);
        });
      } else {
        resolve(this.authenticated);
      }
    });
  }
}
