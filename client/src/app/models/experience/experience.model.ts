export class Experience {
  constructor(
    public id?: number,
    public titulo?: string,
    public local?: string,
    public descricao?: string,
    public data_experience?: Date,
    public qtde_vagas?: number,
    public valor?: number,
    public user_id?: number,
    public cidade_id?: number,
    public experience_type_id?: number
  ){

  }
}
