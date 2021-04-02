import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIurl = 'http://localhost:5000/api/';
  readonly Photourl = 'http://localhost:5000/Photos/';

  constructor(private http: HttpClient) { }

  // Department

  getDepList(): Observable<any[]>{
    return this.http.get<any>(this.APIurl + 'Department');
  }

  addDepartment(val: any): any{
    return this.http.post(this.APIurl + 'Department', val);
  }

  updateDepartment(val: any): any{
    return this.http.put(this.APIurl + 'Department', val);
  }

  deleteDepartment(val: any): any{
    return this.http.delete(this.APIurl + 'Department/' + val);
  }

  // Employee

  getEmpList(): Observable<any[]>{
    return this.http.get<any>(this.APIurl + 'Employee');
  }

  addEmployee(val: any): any{
    return this.http.post(this.APIurl + 'Employee', val);
  }

  updateEmployee(val: any): any{
    return this.http.put(this.APIurl + 'Employee', val);
  }

  deleteEmployee(val: any): any{
    return this.http.delete(this.APIurl + 'Employee/' + val);
  }

  uploadPhoto(val: any, id: number): any{
    return this.http.post(this.APIurl + 'Employee/SaveFile/' + id, val);
  }

  getAllDepartmentNames(): Observable<any[]>{
    return this.http.get<any[]>(this.APIurl + 'Employee/GetAllDepartmentNames');
  }
}
