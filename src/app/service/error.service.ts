import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  renderApiException(e: any) {
    const response = e?.error?.message as Array<String>

    if (e instanceof Array) {
      for (let msg of e) {
        alert(msg)
      }
    } else {
      for (let msg of response) {
        alert(msg)
      }
    }
  }
}
