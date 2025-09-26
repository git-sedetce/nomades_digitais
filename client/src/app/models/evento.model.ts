export class Evento {
[x: string]: any;
  constructor(
    public id?: number,
    public evento_name?: string,
    public city_id?: number,
    public regiao_id?: number,
    public descricao?: string,
    public is_comunity: boolean = false,
    public is_frequency: boolean = false,
    public comunidade_id?: number,
    public dia_frequente?: string,
    public horario?: string,
    public tipo_evento?: string,
    public data_inicio_evento?: Date,
    public data_final_evento?: Date,
    public imagem_evento?: string

  ){

  }
}
