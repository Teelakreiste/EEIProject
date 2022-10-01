import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      color: '#6C63FF'
    });
  }

  alertSuccess(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      color: '#6C63FF'
    });
  }
}
