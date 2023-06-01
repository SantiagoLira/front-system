import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-balance-general',
  templateUrl: './balance-general.component.html',
  styleUrls: ['./balance-general.component.css']
})
export class BalanceGeneralComponent {
  fecha: string = '';
  activos: number = 0;
  pasivos: number = 0;
  patrimonioNeto: number = 0;
  


  constructor(private http: HttpClient) { }

  submitForm() {
    const balance = {
      fecha: this.fecha,
      activos: this.activos,
      pasivos: this.pasivos,
      patrimonioNeto: this.patrimonioNeto
    };

    this.http.post('http://127.0.0.1:3000/registro', balance)
      .subscribe(
        response => {
          console.log('Balance guardado:', response);
          // Aquí puedes redirigir a otra página o realizar otras acciones después de guardar el balance
        },
        error => {
          console.error('Error al guardar el balance:', error);
        }
      );
  }
}
