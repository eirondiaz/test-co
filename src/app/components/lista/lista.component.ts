import { DataService } from './../../services/data.service';
import { Employee } from './../../models/Employee';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  ListEmployees: Employee[] = []

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees() {
    this.dataService.getAllEmployees().subscribe(
      res => {
        this.ListEmployees = res.data
        this.ListEmployees.map(x => {
          x.edad = this.calcularEdad(x.birthdate)
        })
      },
      error => console.log(error)
    )
  }

  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }

  deleteEmployee(id: string) {
    Swal.fire({
      icon: 'info',
      title: '¿Confirma que deseas eliminar este empleado?',
      showConfirmButton: true,
      showCancelButton: true
    }).then(res => {
      if(res.isConfirmed) {
        this.dataService.deleteEmployee(id).subscribe(
          res => {
            this.getAllEmployees()
          },
          error => console.log(error)
        )
      }
    })
  }
}
