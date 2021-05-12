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
      },
      error => console.log(error)
    )
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
