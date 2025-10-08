export class VagaEmprego {
  constructor(
    public id?: number,
    public parceiro_id?: number,
    public nomad_id?: number,
    public nome_vaga?: string,
    public descricao?: string,
    public status?: string,
  ){}
}
