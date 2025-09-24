export class EncontrosComunidade {
  constructor(
    public id?: number,
    public comunidade_id?: number,
    public lugar?: string,
    public formato?: string,
    public hora?: string,
    public endereco?: string,
    public destinos_explorados?: string
  ){
  }
}
