export class Comunidade {
  constructor(
    public id?: number,
    public name?: string,
    public descricao?: string,
    public historia?: string,
    public data_criacao?: Date,
    public regras_convivencia?: string,
    public gestor_comunidade?: string,
    public idioma?: string,
  ){
  }
}
