import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscadorListFederado'
})
export class BuscadorListFederadoPipe implements PipeTransform {

  
  transform(items: any[], texto: string): any[] {
    if(!items) return [];//Si no se encuentran coincidencias, procedemos a enviar un objeto vacio
    if(!texto) return items;//Si no se ingresa nada en la caja de texto, se envia todos los usuarios

 
    return items.filter(item => {//Recorre el objeto y declara una variable item que obtendra todo los elementos que conforman a items
      return Object.keys(item).some(key => {//Adquiere el valor de cada elemento y busca el que más se parezca de acuerdo a lo digitado 
        return String(item[key]).toLowerCase().includes(texto.toLowerCase());//Envia todas las coincidencias en base a lo digitado en el campo de texto
      });
    });
  }

}
