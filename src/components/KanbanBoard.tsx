import { useState } from 'react'

interface Stage {
  id: string
  title: string
  color: string
}

interface Deal {
  id: string
  stageId: string
  title: string
  value?: number
}

export function KanbanBoard() {
  const [stages] = useState<Stage[]>([
    { id: '1', title: 'Prospecção', color: '#6B7280' },
    { id: '2', title: 'Qualificação', color: '#3B82F6' },
    { id: '3', title: 'Proposta', color: '#F59E0B' },
    { id: '4', title: 'Negociação', color: '#8B5CF6' },
    { id: '5', title: 'Fechado/Ganho', color: '#10B981' },
  ])

  const [deals, setDeals] = useState<Deal[]>([
    { id: '1', stageId: '1', title: 'Lead Teste 1', value: 5000 },
    { id: '2', stageId: '2', title: 'Lead Teste 2', value: 15000 },
  ])

  const [newDealTitle, setNewDealTitle] = useState('')
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const handleAddDeal = (stageId: string) => {
    if (!newDealTitle.trim()) return
    const newDeal: Deal = {
      id: Date.now().toString(),
      stageId,
      title: newDealTitle,
      value: 0,
    }
    setDeals([...deals, newDeal])
    setNewDealTitle('')
    setActiveStage(null)
  }

  const formatCurrency = (value?: number) => {
    if (!value) return 'R$ 0,00'
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '24px', overflowX: 'auto' }}>
      {stages.map(stage => {
        const stageDeals = deals.filter(d => d.stageId === stage.id)
        const totalValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0)

        return (
          <div key={stage.id} style={{ minWidth: '300px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '16px', borderBottom: `4px solid ${stage.color}`, borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontWeight: '600', color: '#1f2937' }}>{stage.title}</h3>
                <span style={{ fontSize: '12px', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '12px' }}>
                  {stageDeals.length}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Total: {formatCurrency(totalValue)}
              </p>
            </div>

            <div style={{ padding: '12px', minHeight: '200px', backgroundColor: '#f9fafb' }}>
              {stageDeals.map(deal => (
                <div key={deal.id} style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e5e7eb', cursor: 'grab' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{deal.title}</h4>
                  {deal.value ? (
                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#059669', fontWeight: '500' }}>
                      💰 {formatCurrency(deal.value)}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb' }}>
              {activeStage === stage.id ? (
                <div>
                  <input
                    autoFocus
                    type="text"
                    value={newDealTitle}
                    onChange={e => setNewDealTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddDeal(stage.id)}
                    placeholder="Título do negócio..."
                    style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleAddDeal(stage.id)}
                      style={{ flex: 1, backgroundColor: '#3b82f6', color: 'white', fontSize: '12px', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                    >
                      Adicionar
                    </button>
                    <button
                      onClick={() => setActiveStage(null)}
                      style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActiveStage(stage.id)}
                  style={{ width: '100%', padding: '8px', fontSize: '14px', color: '#6b7280', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  + Adicionar negócio
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
