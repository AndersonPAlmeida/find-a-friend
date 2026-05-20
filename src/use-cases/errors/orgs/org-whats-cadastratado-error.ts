export class OrgWhatsCadastratadoError extends Error {
  constructor() {
    super('E-mail já existente.')
  }
}
