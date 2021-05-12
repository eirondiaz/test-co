import { DataService } from './../../services/data.service';
import { Employee } from './../../models/Employee';
import { Component, OnInit } from '@angular/core';

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
}
