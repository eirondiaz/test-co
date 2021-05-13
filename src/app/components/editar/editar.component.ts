import { Employee } from './../../models/Employee';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  form: FormGroup
  area: boolean = false
  CargosList: any[] = []
  PaisesList: any[] = []
  Employee: Employee = {}

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private _builder: FormBuilder,
    private router: Router
  ) { 
    this.form = this._builder.group({
      birthdate: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      hiringdate: ['', Validators.required],
      status: [null, Validators.required],
      cargo: ['', Validators.required],
      comision: [0],
    })
  }

  ngOnInit(): void {
    this.getPaises()
    this.getEmployeeById(this.route.snapshot.paramMap.get('id'))
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

  editar(value) {
    value = {...value, area: this.areat}

    if (this.calcularEdad(value.birthdate) < 18) {
      Swal.fire({
        icon: 'error',
        title: 'La edad debe ser mayor a 18 años',
        showConfirmButton: true,
      })

      return
    }
    
    this.dataService.editEmployee(value, this.Employee._id).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Empleado editado correctamente',
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

  getEmployeeById(id: string) {
    this.dataService.getEmployeeById(id).subscribe(
      res => {
        this.Employee = res.data
        this.Employee.birthdate = this.Employee.birthdate.substring(0, 10)
        this.Employee.hiringdate = this.Employee.hiringdate.substring(0, 10)
        this.Employee.area == 'Administrativa'? this.area = false: this.area = true
        this.clickArea()
        this.Employee.cargo = this.Employee.cargo._id 
      },
      error => console.log(error)
    )
  }

}
