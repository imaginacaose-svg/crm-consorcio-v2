// Tipos espelhando o schema do banco (supabase/schema.sql)

export type ConsorcioTipo = "imovel" | "auto" | "moto" | "servico" | "pesado";

export type LeadStatus =
  | "entrada"
  | "qualificacao"
  | "proposta"
  | "negociacao"
  | "forecast"
  | "pos_venda"
  | "perdido";

export type InteracaoTipo =
  | "ligacao"
  | "whatsapp"
  | "email"
  | "reuniao"
  | "audio"
  | "nota";

export type ContemplacaoStatus =
  | "aguardando"
  | "lance_ofertado"
  | "contemplado"
  | "quitado";

export interface Profile {
  id: string;
  nome: string;
  email: string | null;
  role: "admin" | "socio" | "gestor" | "vendedor";
  avatar_url: string | null;
  criado_em: string;
}

export interface PipelineStage {
  id: string;
  nome: string;
  emoji: string;
  ordem: number;
  cor: string;
  ativo: boolean;
}

export interface Lead {
  id: string;
  nome: string;
  telefone: string | null;
  email: string | null;
  cidade: string | null;
  estado: string | null;
  faixa_etaria: string | null;
  renda_estimada: number | null;
  objetivo: string | null;
  tipo_consorcio: ConsorcioTipo;
  valor_carta: number | null;
  parcela_valor: number | null;
  grupo: string | null;
  cota: string | null;
  status: LeadStatus;
  origem: string | null;
  tags: string[];
  responsavel_id: string | null;
  perdido_motivo: string | null;
  previsao_fechamento: string | null;
  pos_venda: ContemplacaoStatus;
  proximo_followup: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface Interacao {
  id: string;
  lead_id: string;
  tipo: InteracaoTipo;
  descricao: string;
  usuario_id: string | null;
  criado_em: string;
}

export interface FollowUp {
  id: string;
  lead_id: string;
  lembrete_em: string;
  nota: string | null;
  concluido: boolean;
  criado_em: string;
}
