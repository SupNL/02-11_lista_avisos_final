import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  CameraSource
} from "@capacitor/core";

const { Camera } = Plugins;

export interface Photo {
  data : Blob;
  url : string;
  type : string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos : Photo[] = [];

  constructor() { }

  public addNewToGallery() : Promise<void> {
    return new Promise((resolve) => {
      Camera.getPhoto({
        resultType : CameraResultType.Uri,
        source : CameraSource.Camera,
        quality : 80,
      })
      .then(capturedPhoto => {
        return fetch(capturedPhoto.webPath)
        .then(r => r.blob())
        .then(blob => {
          this.photos.unshift({
            data : blob,
            url : capturedPhoto.webPath,
            type : capturedPhoto.format
          });
          resolve();
        })
      })
    })
  }
}
