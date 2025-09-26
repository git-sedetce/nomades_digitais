export class EncontrosComunidade {
  constructor(
    public id?: number,
    public comunidade_id?: number,
    public lugar?: string,
    public formato?: string,
    public data_encontro?: Date,
    public hora?: string,
    public cep?: string,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cidade?: string,
    public estado?: string
  ){
  }
}
