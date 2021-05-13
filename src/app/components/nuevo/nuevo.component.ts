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
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*')])],
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

  guardar(value) {
    value = {...value, area: this.areat}
    if (this.calcularEdad(value.birthdate) < 18) {
      Swal.fire({
        icon: 'error',
        title: 'La edad debe ser mayor a 18 años',
        showConfirmButton: true,
      })

      return
    }
    
    this.dataService.createEmployee(value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Empleado creado correctamente',
          showConfirmButton: true,
        })
        this.router.navigate(["/lista"])
      },
      error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          showConfirmButton: true,
        })
      }
    )
  }
}
