import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostInterface, PostType } from '../interfaces/interface.post';

@Injectable({
  providedIn: 'root'
})
export class PostViewService {

  constructor() { }

  getPostImageUrl(image : any) {
    let url : string;
    url = image.url as string;
    url = url.replace("localhost", environment.serverIp);
    return url;
  }

  getPostType(post : PostInterface) {
    switch(post.type) {
      case PostType.COMPLIMENT:
        return "Elogio";
      case PostType.CRITICISM:
        return "Crítica";
      case PostType.SUGGESTION:
        return "Sugestão";
    }
  }

  stringifyDate(date : string) {
    const values = date.split('-');
    let mes = "Janeiro";
    switch(values[1]) {
      case '02':
        mes = "Fevereiro";
        break;
      case '03':
        mes = "Março";
        break;
      case '04':
        mes = "Abril";
        break;
      case '05':
        mes = "Maio";
        break;
      case '06':
        mes = "Junho";
        break;
      case '07':
        mes = "Julho";
        break;
      case '08':
        mes = "Agosto";
        break;
      case '09':
        mes = "Setembro";
        break;
      case '10':
        mes = "Outubro";
        break;
      case '11':
        mes = "Novembro";
        break;
      case '12':
        mes = "Dezembro";
        break;
    }
    return `${parseInt(values[2])} de ${mes.toLowerCase()} de ${values[0]}`
  }
}
