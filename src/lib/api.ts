import { supabase } from "./supabase";
import type { Lead, Interacao, FollowUp, PipelineStage, Profile } from "./types";

// ==================== AUTH ====================

export async function signIn(email: string, senha: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) throw new Error(error.message);
  return data;
}

export async function signUp(email: string, senha: string, nome: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: { data: { nome } },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getProfile(): Promise<Profile | null> {
  const { data } = await supabase.auth.getUser();
  const id = data.user?.id;
  if (!id) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  return profile;
}

// ==================== PIPELINE STAGES ====================

export async function listarStages(): Promise<PipelineStage[]> {
  const { data, error } = await supabase
    .from("pipeline_stages")
    .select("*")
    .eq("ativo", true)
    .order("ordem");
  if (error) throw error;
  return data ?? [];
}

// ==================== LEADS ====================

export async function listarLeads(filtros?: {
  status?: string;
  responsavelId?: string;
  busca?: string;
}): Promise<Lead[]> {
  let query = supabase.from("leads").select("*").order("atualizado_em", { ascending: false });
  if (filtros?.status) query = query.eq("status", filtros.status);
  if (filtros?.responsavelId) query = query.eq("responsavel_id", filtros.responsavelId);
  if (filtros?.busca)
    query = query.or(`nome.ilike.%${filtros.busca}%,telefone.ilike.%${filtros.busca}%,email.ilike.%${filtros.busca}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function criarLead(lead: Partial<Lead>): Promise<Lead> {
  const { data, error } = await supabase.from("leads").insert(lead).select().single();
  if (error) throw error;
  return data;
}

export async function atualizarLead(id: string, mudancas: Partial<Lead>): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update(mudancas)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function moverLead(id: string, novoStatus: Lead["status"]): Promise<Lead> {
  return atualizarLead(id, { status: novoStatus });
}

export async function excluirLead(id: string) {
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw error;
}

// ==================== INTERAÇÕES ====================

export async function listarInteracoes(leadId: string): Promise<Interacao[]> {
  const { data, error } = await supabase
    .from("interacoes")
    .select("*")
    .eq("lead_id", leadId)
    .order("criado_em", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function adicionarInteracao(
  leadId: string,
  tipo: Interacao["tipo"],
  descricao: string
): Promise<Interacao> {
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("interacoes")
    .insert({ lead_id: leadId, tipo, descricao, usuario_id: user.user?.id ?? null })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ==================== FOLLOW-UPS ====================

export async function listarFollowUpsPendentes(): Promise<FollowUp[]> {
  const { data, error } = await supabase
    .from("follow_ups")
    .select("*, leads(*)")
    .eq("concluido", false)
    .order("lembrete_em");
  if (error) throw error;
  return (data as any[]) ?? [];
}

export async function criarFollowUp(leadId: string, lembreteEm: Date, nota?: string): Promise<FollowUp> {
  const { data, error } = await supabase
    .from("follow_ups")
    .insert({ lead_id: leadId, lembrete_em: lembreteEm.toISOString(), nota })
    .select()
    .single();
  if (error) throw error;
  // Sincroniza o campo espelho no lead
  await supabase.from("leads").update({ proximo_followup: lembreteEm.toISOString() }).eq("id", leadId);
  return data;
}

export async function concluirFollowUp(id: string) {
  const { error } = await supabase.from("follow_ups").update({ concluido: true }).eq("id", id);
  if (error) throw error;
}

// ==================== EQUIPE ====================

export async function listarEquipe(): Promise<Profile[]> {
  const { data, error } = await supabase.from("profiles").select("*").order("nome");
  if (error) throw error;
  return data ?? [];
}

// ==================== REALTIME ====================

export function onLeadChange(callback: (novo: Lead) => void) {
  const channel = supabase
    .channel("leads-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "leads" },
      (payload) => callback(payload.new as Lead)
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}
