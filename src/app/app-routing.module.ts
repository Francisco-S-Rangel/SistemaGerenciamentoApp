import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {path: "", component: PrincipalComponent},
  {path: "departamentos", component: DepartamentosComponent},
  {path: "departamentos/funcionarios",component: FuncionariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
