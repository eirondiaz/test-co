import { Employee } from './../../models/Employee';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  PaisesList: any[] = []
  CargosList: any[] = []
  area: boolean = false
  Employee: Employee = {}

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPaises()
    this.clickArea()
  }

  getPaises() {
    this.dataService.getPaises().subscribe(
      res => {
        this.PaisesList = res
      },
      error => console.log(error)
    )
  }

  clickArea() {
    this.area = !this.area

    this.area? this.Employee.area = 'Administrativa': this.Employee.area = 'Tecnología'
    this.getCargosByArea(this.Employee.area)
  }

  getCargosByArea(area: string) {
    this.dataService.getCargoByArea(area).subscribe(
      res => {
        this.CargosList = res.data
      },
      error => console.log(error)
    )
  }

  guardar() {
    console.log(this.Employee)
    if (
      this.Employee.name == null || this.Employee.birthdate == null || this.Employee.country == null ||
      this.Employee.username == null || this.Employee.hiringdate == null || this.Employee.cargo == null
    ) {
      console.log('falta')
    }
    else {
      this.dataService.createEmployee(this.Employee).subscribe(
        res => {
          console.log(res)
          this.router.navigate(["/lista"])
        },
        error => console.log(error)
      )
    }
  }
}
