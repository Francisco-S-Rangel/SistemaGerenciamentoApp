import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Departamento } from 'src/app/models/Departamento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

baseUrl = `${environment.API_url}/Departamentos`;

constructor(private http: HttpClient) { }

getAll(): Observable<Departamento[]>{
  return this.http.get<Departamento[]>(`${this.baseUrl}`);
}
getById(id: number): Observable<Departamento>{
  return this.http.get<Departamento>(`${this.baseUrl}/${id}`);
}
put(id: number,departamento: Departamento){
  console.log(id);
  console.log(departamento);
  return this.http.put(`${this.baseUrl}/${id}`, departamento).pipe(catchError(this.errorHandler))
}
errorHandler(error: HttpErrorResponse) {
  return throwError(error.message || "server error.");
}
post(departamento: Departamento){
  return this.http.post(`${this.baseUrl}`, departamento);
}
delete(id: number){
  return this.http.delete<Departamento>(`${this.baseUrl}/${id}`);
}
}
