import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostInterface, PostType } from '../interfaces/interface.post';
import { Photo } from './photo.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http : HttpClient,
    private storage : StorageService
  ) { }

  public login(login : string, senha : string) {
    const url = `${environment.serverUrl}/login`;
    const data = {
      login,
      senha
    }
    return new Promise((resolve, reject) => {
      this.http.post(url, data)
      .subscribe((success) => {
        resolve(success);
      }, (error) => {
        reject({
          message : error.error.message,
          status : error.status
        })
      })
    })
  }

  public uploadPost(postData : any, photos : Photo[]) : Promise<Object> {
    const url = `${environment.serverUrl}/posts`;

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("message", postData.message);
      formData.append("type", postData.type);
      photos.forEach(photo => {
        formData.append("images", photo.data, `photo.${photo.type}`);
      });
      this.http.post(url, formData)
      .subscribe(
        (success) => {
          resolve(success);
        },
        (err) => {
          reject(err);
        }
      )
    });
  }

  public registerAccount(user) {
    const url = `${environment.serverUrl}/users`;

    return new Promise((resolve, reject) => {
      this.http.post(url, user)
      .subscribe((success) => {
        resolve(success);
      }, (error) => {
        reject({
          message : error.error.message,
          status : error.status
        })
      })
    })
  }

  public removePost(id : number, query ?: string) {
    const url = `${environment.serverUrl}/posts/${id}${query ? "?" + query : ""}`;
    
    return new Promise<void>((resolve, reject) => {
      this.http.delete(url)
      .subscribe(
        (success) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  public approvePost(id : number, query ?: string) {
    const url = `${environment.serverUrl}/posts/${id}${query ? "?" + query : ""}`;
    
    return new Promise<void>((resolve, reject) => {
      this.http.put(url, null)
      .subscribe(
        (success) => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  public getPosts(query ?: string) {
    const url = `${environment.serverUrl}/posts${query ? "?" + query : ""}`;
    
    return new Promise<PostInterface[]>((resolve, reject) => {
      this.storage.load("token")
      .then(token => {
        this.http.get(url)
        .subscribe(
          (data) => {
            resolve(data as PostInterface[]);
          },
          (error) => {
            reject(error);
          }
        )
      })
    })
  }
}
