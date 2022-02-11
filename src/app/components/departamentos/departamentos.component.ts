import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Departamento } from 'src/app/models/Departamento';
import { DepartamentosService } from './departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  public departamentoSelecionado: Departamento;
  public departamentoSelecionado2: Departamento;
  public departamentoForm: FormGroup;
  public cadastrobtn: boolean = false;
  public errorMsg: string;

  public departamentos : Departamento[];

  constructor(private fb: FormBuilder,private departamentoService: DepartamentosService ) { 
    this.criarForm();
  }
  ngOnInit(): void {
    this.carregarDepartamentos();
  }
  carregarDepartamentos(){
    this.departamentoSelecionado2=null;
    this.departamentoService.getAll().subscribe(
      (departamentos: Departamento[])=>{
        this.departamentos = departamentos;
        console.log(this.departamentos);
      },
      (error: any)=>{}
    );
  }
  botaodecadastro(){
      this.cadastrobtn = true;
  }
  criarForm(){
    this.departamentoForm = this.fb.group({
      id: 0,
      nome: ['', Validators.required],
      sigla: ['', Validators.required],
    });
  }
  salvarDepartamento(departamento: Departamento){
    console.log(departamento);
    this.departamentoService.post(departamento).subscribe(
      ()=>{
        console.log();
        this.carregarDepartamentos();
      },
      (erro: any)=>{
        console.log(erro)
      }
    );
}
atualizarDepartamento(){
  console.log(this.departamentoForm.value);
  this.departamentoService.put(this.departamentoSelecionado.id,this.departamentoForm.value).subscribe(
    ()=>{
      console.log();
      this.carregarDepartamentos();
    },
    (erro: any)=>{
      console.log(erro)
    }
  );
}
  departamentoSubmit(){
    this.atualizarDepartamento();
  }
  departamentoSelect(departamento: Departamento){
    this.departamentoSelecionado = departamento;
    this.departamentoForm.patchValue(departamento);
  }
  departamentoNovo(){
    this.departamentoSelecionado2 = new Departamento();
    this.departamentoSelecionado2 = this.departamentoForm.value;
    this.departamentoForm.patchValue(this.departamentoSelecionado2);
    this.salvarDepartamento(this.departamentoForm.value);
  }
  voltar(){
    this.departamentoSelecionado = null;
  }
  fecharCadastro(){
    this.cadastrobtn = false;
  }
  deletarDepartamento(id: number){
    this.departamentoService.delete(id).subscribe(
      (model: any)=>{
        console.log(model);
        this.carregarDepartamentos();
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }
}



