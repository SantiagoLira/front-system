import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Item {
  nombre: string;
  costo: number;
  categoria: string;
  _id: string;
}

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'],
})
export class RecursosComponent {
  fecha: string = '';
  nombre: string = '';
  costo: number = 0;
  categoria: string = '';
  items: any[] = [];
  categorias: string[] = [];
  itemsPorCategoria: { [categoria: string]: Item[] } = {};

  constructor(private http: HttpClient) {}
  guardarRecursos() {
    const recurso = {
      fecha: this.fecha,
      nombre: this.nombre,
      costo: this.costo,
      categoria: this.categoria,
    };
    console.log(recurso);

    this.http.post('http://127.0.0.1:3000/balance', recurso).subscribe(
      (response) => {
        console.log('Guardado exitoso');
      },
      (error) => {
        console.error('Error al guardar el balance:', error);
      }
    );

    this.mostrartabla();
  }
  mostrartabla() {

    this.categorias = [];
    this.itemsPorCategoria = {};

    this.http
      .get<any>('http://127.0.0.1:3000/balance', {
        params: {
          fecha: this.fecha,
        },
      })
      .subscribe((data) => {
        this.items = data;
        this.items.forEach((data: any)=>{
          data.items.forEach((item: any)=> {
            if (!this.categorias.includes(item.categoria)) {
              this.categorias.push(item.categoria);
              this.itemsPorCategoria[item.categoria] = [];
            }
            this.itemsPorCategoria[item.categoria].push(item);

          });

        });
        console.log(this.items);
        
        
      },
      (error) => {
        console.error('Error al obtener el recurso', error);
      }
      );
   
  }
}
