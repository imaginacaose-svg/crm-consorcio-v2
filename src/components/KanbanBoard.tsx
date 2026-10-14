import { useState } from 'react';

type Stage = { id: string; title: string; color: string };
type Deal = { id: string; stageId: string; title: string; value: number };

const STAGES: Stage[] = [
  { id: '1', title: 'Prospecção', color: '#64748b' },
  { id: '2', title: 'Qualificação', color: '#3b82f6' },
  { id: '3', title: 'Proposta', color: '#f59e0b' },
  { id: '4', title: 'Negociação', color: '#8b5cf6' },
  { id: '5', title: 'Fechado / Ganho', color: '#10b981' },
];

const INITIAL_DEALS: Deal[] = [
  { id: '1', stageId: '1', title: 'Ana — Cotação de cota', value: 25000 },
  { id: '2', stageId: '2', title: 'Carlos — Simulação de carta', value: 40000 },
  { id: '3', stageId: '3', title: 'Maria — Proposta enviada', value: 60000 },
];

const money = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

export function KanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [adding, setAdding] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  const addDeal = (stageId: string) => {
    if (!title.trim()) return;
    setDeals(prev => [
      ...prev,
      { id: Date.now().toString(), stageId, title: title.trim(), value: 0 },
    ]);
    setTitle('');
    setAdding(null);
  };

  const removeDeal = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
  };

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <>
      {/* RESUMO */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Negócios no pipeline', value: String(deals.length) },
          { label: 'Valor total', value: money(totalPipeline) },
          { label: 'Etapas ativas', value: String(STAGES.length) },
        ].map(card => (
          <div key={card.label} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 22px', flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* KANBAN */}
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 12 }}>
        {STAGES.map(stage => {
          const cards = deals.filter(d => d.stageId === stage.id);
          const total = cards.reduce((sum, d) => sum + d.value, 0);

          return (
            <div key={stage.id} style={{ width: 280, flexShrink: 0, background: '#e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#ffffff', padding: 16, borderTop: `4px solid ${stage.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: 14, color: '#0f172a' }}>{stage.title}</strong>
                  <span style={{ background: '#f1f5f9', borderRadius: 999, padding: '2px 9px', fontSize: 12, color: '#475569' }}>{cards.length}</span>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{money(total)}</div>
              </div>

              <div style={{ padding: 12, minHeight: 180 }}>
                {cards.map(deal => (
                  <div key={deal.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 8, padding: 12, marginBottom: 10, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <strong style={{ fontSize: 13, color: '#0f172a', lineHeight: 1.4 }}>{deal.title}</strong>
                      <button onClick={() => removeDeal(deal.id)} title="Excluir" style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}>✕</button>
                    </div>
                    <div style={{ fontSize: 12, color: '#059669', fontWeight: 600, marginTop: 8 }}>{money(deal.value)}</div>
                  </div>
                ))}

                {cards.length === 0 && (
                  <div style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', padding: '24px 0' }}>Nenhum negócio aqui</div>
                )}

                {adding === stage.id ? (
                  <div style={{ background: '#ffffff', padding: 10, borderRadius: 8, border: '1px solid #3b82f6' }}>
                    <input
                      autoFocus
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addDeal(stage.id)}
                      placeholder="Nome do negócio"
                      style={{ width: '100%', boxSizing: 'border-box', padding: 8, fontSize: 13, border: '1px solid #cbd5e1', borderRadius: 5, marginBottom: 8 }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => addDeal(stage.id)} style={{ flex: 1, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 5, padding: 7, fontSize: 12, cursor: 'pointer' }}>Adicionar</button>
                      <button onClick={() => setAdding(null)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => { setAdding(stage.id); setTitle(''); }} style={{ width: '100%', padding: 10, border: '1px dashed #94a3b8', background: 'transparent', borderRadius: 8, color: '#475569', fontSize: 13, cursor: 'pointer' }}>
                    + Novo negócio
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
