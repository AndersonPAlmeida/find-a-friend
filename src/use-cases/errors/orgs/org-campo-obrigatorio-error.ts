export class OrgCampoObrigatorioError extends Error {
  constructor() {
    super('Os campo endereço/whatsApp são obrigatorios.')
  }
}
