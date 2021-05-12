import { Employee } from './../models/Employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API: string = 'https://apirest-dr.herokuapp.com/api/v1/employees/'

  constructor(private _http: HttpClient) { }

  getAllEmployees() {
    return this._http.get<any>(this.API) 
  }

  getEmployeeById(id: string) {
    return this._http.get<any>(this.API + id) 
  }

  createEmployee(emp: Employee) {
    return this._http.post<any>(this.API, emp) 
  }

  editEmployee(emp: Employee, id: string) {
    return this._http.put<any>(this.API + id, emp) 
  }

  deleteEmployee(id: string) {
    return this._http.delete<any>(this.API + id) 
  }
}
