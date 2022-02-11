import { Funcionario } from "./Funcionario";

export class Departamento {
    constructor(){
        this.id=0;
        this.nome='';
        this.sigla='';
        this.funcionario = new Funcionario();
    }
    id: number;
    nome: string;
    sigla: string;
    funcionario: Funcionario;
}
