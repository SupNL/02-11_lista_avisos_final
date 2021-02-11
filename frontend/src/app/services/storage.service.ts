import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key : string, value : any) : Promise<void> {
    const stringified = JSON.stringify(value);
    return new Promise((resolve) => {
      Storage.set({key, value : stringified.toString()}).then(() => resolve());
    })
  }

  load(key : string) : Promise<any> {
    return new Promise((resolve) => {
      Storage.get({ key }).then(res => {
        if(res.value != null){
          const object = JSON.parse(res.value);
          resolve(object);
        }
        resolve(null);
      })
    })
  }

  remove(key : string) : Promise<void> {
    return new Promise((resolve) => {
      Storage.remove({ key }).then(() => {
        resolve();
      })
    })
  }
}
