import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Item {
  nombre: string;
  costo: number;
  categoria: string;
  _id: string;
}
interface Category {
  items: Item[];
  sumaCostos: number;
}
interface Data {
  _id: string;
  fecha: string;
  items: Item[];
  __v: number;
}

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'],
})
export class RecursosComponent {
  mostrarTabla: boolean = false;
  fecha: string = '';
  nombre: string = '';
  costo: number = 0;
  newcategoria: string = '';
  jsonData: Data[] = [];
  categorias: string[] = [
    'activoC',
    'activo',
    'activoD',
    'pasivoC',
    'pasivo',
    'capital',
  ];
  itemsPorCategoria: { [categoria: string]: Category } = {};
  sumaTotal1to3: number = 0;
  sumaTotal4to6: number = 0;

  constructor(private http: HttpClient) {}
  guardarRecursos() {
    const recurso = {
      fecha: this.fecha,
      nombre: this.nombre,
      costo: this.costo,
      categoria: this.newcategoria,
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
    this.http
      .get<any>('http://127.0.0.1:3000/balance', {
        params: {
          fecha: this.fecha,
        },
      })
      .subscribe(
        (data) => {
          const response: Data[] = data;
          this.jsonData = response;

          this.separarPorCategoria();
          this.calcularSumaTotales();
          this.mostrarTabla = true;
        },
        (error) => {
          console.error('Error al obtener el recurso', error);
        }
      );
  }
  separarPorCategoria(): void {
    this.categorias.forEach((categoria: string) => {
      this.itemsPorCategoria[categoria] = {
        items: [],
        sumaCostos: 0,
      };
    });

    this.jsonData.forEach((data: Data) => {
      data.items.forEach((item: Item) => {
        if (this.itemsPorCategoria.hasOwnProperty(item.categoria)) {
          this.itemsPorCategoria[item.categoria].items.push(item);
          this.itemsPorCategoria[item.categoria].sumaCostos += item.costo;
        }
      });
    });
  }
  calcularSumaTotales(): void {
    this.sumaTotal1to3 = 0;
    this.sumaTotal4to6 = 0;

    for (let i = 0; i < this.categorias.length; i++) {
      const categoria = this.categorias[i];
      if (['activoC', 'activo', 'activoD'].includes(categoria)) {
        this.sumaTotal1to3 += this.itemsPorCategoria[categoria].sumaCostos;
      } else {
        this.sumaTotal4to6 += this.itemsPorCategoria[categoria].sumaCostos;
      }
    }
  }
}
