import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';
import { DepartamentosService } from '../departamentos/departamentos.service';
import { FuncionariosService } from './funcionarios.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  public funcionarioSelecionado: Funcionario;
  public funcionarioSelecionado2: Funcionario;
  public funcionarioForm: FormGroup;
  public cadastrobtn: boolean = false;

  public funcionarios: Funcionario[];
  constructor(private fb: FormBuilder,private funcionarioService: FuncionariosService) {
    this.criarForm();
   }
   ngOnInit(): void {
     this.carregarFuncionarios();
  }
  carregarFuncionarios(){
    this.funcionarioSelecionado2=null;
    this.funcionarioService.getAll().subscribe(
      (funcionarios: Funcionario[])=>{
        this.funcionarios = funcionarios;
      },
      (erro: any)=>{}
    );
  }
  botaodecadastro(){
    this.cadastrobtn = true;
}
  criarForm(){
    this.funcionarioForm = this.fb.group({
      id: 0,
      nome: ['', Validators.required],
      foto: ['', Validators.required],
      rg: ['', Validators.required],
      departamentoId: []
    });
  }
  salvarFuncionario(funcionario: Funcionario){
    console.log(funcionario);
        this.funcionarioService.post(funcionario).subscribe(
          ()=>{
            console.log();
            this.carregarFuncionarios();
          },
          (erro: any)=>{
            console.log("Erro")
          }
        );
  }
  atualizarFuncionario(){
    console.log(this.funcionarioForm.value);
      this.funcionarioService.put(this.funcionarioSelecionado.id,this.funcionarioForm.value).subscribe(
        ()=>{
          console.log();
          this.carregarFuncionarios();
        },
        (erro: any)=>{
          console.log("Erro")
        }
        );
        console.log(this.funcionarioForm.value);
    }
  funcionarioSubmit(){
    console.log(this.funcionarioForm.value);
    this.atualizarFuncionario();
  }
  funcionarioSelect(funcionario: Funcionario){
    this.funcionarioSelecionado = funcionario;
    this.funcionarioForm.patchValue(funcionario);
  }
  //Não esquecer de nular o funcionarioSelecionado2
  funcionarioNovo(){
    this.funcionarioSelecionado2 = new Funcionario();
    this.funcionarioSelecionado2 = this.funcionarioForm.value;
    this.funcionarioForm.patchValue(this.funcionarioSelecionado2);
    this.salvarFuncionario(this.funcionarioForm.value);
  }
  voltar(){
    this.funcionarioSelecionado = null;
  }
  fecharCadastro(){
    this.cadastrobtn = false;
  }
  deletarFuncionario(id: number){
    this.funcionarioService.delete(id).subscribe(
      (model: any)=>{
        console.log(model);
        this.carregarFuncionarios();
      },
      (erro: any)=>{
        console.log(erro);
      }
    );
  }
}
