export class TemporadaNomad {
  constructor(
    public id?: number,
    public nome_evento?: string,
    public data_evento?: Date,
    public horario?: string,
    public tipo_evento?: string,
    public cidade_id?: number,
    public local?: string,
    public descricao?: string,
    public endereco?: string,
    public anexo_imagem?: string
  ){

  }
}
