import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/Funcionario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

baseUrl = `${environment.API_url}/Funcionarios`;

constructor(private http: HttpClient) { }

getAll(): Observable<Funcionario[]>{
  return this.http.get<Funcionario[]>(`${this.baseUrl}`);
}
getById(id: number): Observable<Funcionario>{
  return this.http.get<Funcionario>(`${this.baseUrl}/${id}`);
}
put(id:number,funcionario: Funcionario){
  return this.http.put(`${this.baseUrl}/${id}`, funcionario);
}
post(funcionario: Funcionario){
  return this.http.post(`${this.baseUrl}`, funcionario);
}
delete(id: number){
  return this.http.delete<Funcionario>(`${this.baseUrl}/${id}`);
}
}
