import { Employee } from './../../models/Employee';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  PaisesList: any[] = []
  CargosList: any[] = []
  area: boolean = false

  form: FormGroup

  constructor(
    private dataService: DataService,
    private router: Router,
    private _builder: FormBuilder
  ) { 
    this.form = this._builder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      hiringdate: ['', Validators.required],
      status: [true, Validators.required],
      cargo: ['', Validators.required],
      comision: [0],
    })
  }

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

  areat: string
  clickArea() {
    this.area = !this.area

    this.area? this.areat = 'Administrativa': this.areat = 'Tecnología'
    this.getCargosByArea(this.areat)
  }

  getCargosByArea(area: string) {
    this.dataService.getCargoByArea(area).subscribe(
      res => {
        this.CargosList = res.data
      },
      error => console.log(error)
    )
  }

  guardar(value) {
    value = {...value, area: this.areat}
    this.dataService.createEmployee(value).subscribe(
      res => {
        this.router.navigate(["/lista"])
      },
      error => console.log(error)
    )
    //console.log(this.Employee)
    /* if (
      this.Employee.name == null || this.Employee.birthdate == null || this.Employee.country == null ||
      this.Employee.username == null || this.Employee.hiringdate == null || this.Employee.cargo == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Debes llenar todos los campos',
        showConfirmButton: true,
      })
    }
    else {
      this.dataService.createEmployee(this.Employee).subscribe(
        res => {
          this.Employee = {status: true, comision: 0}
          this.router.navigate(["/lista"])
        },
        error => console.log(error)
      )
    } */
  }
}
