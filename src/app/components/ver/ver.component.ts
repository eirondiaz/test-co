import { DataService } from './../../services/data.service';
import { Employee } from './../../models/Employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  Employee: Employee = {}
  area: boolean = true

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getEmployeeById(this.route.snapshot.paramMap.get('id'))
  }

  getEmployeeById(id: string) {
    this.dataService.getEmployeeById(id).subscribe(
      res => {
        this.Employee = res.data
        this.Employee.birthdate = this.Employee.birthdate.substring(0, 10)
        this.Employee.hiringdate = this.Employee.hiringdate.substring(0, 10)
      },
      error => console.log(error)
    )
  }
}
