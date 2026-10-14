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
    <div className="flex gap-4 overflow-x-auto">
      {stages.map(stage => {
        const stageDeals = deals.filter(d => d.stageId === stage.id)
        const totalValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0)

        return (
          <div key={stage.id} className="flex-shrink-0 w-80 bg-white rounded-lg shadow">
            <div 
              className="p-4 border-b-4 rounded-t-lg"
              style={{ borderColor: stage.color }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">{stage.title}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {stageDeals.length}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Total: {formatCurrency(totalValue)}
              </p>
            </div>

            <div className="p-3 min-h-[200px] bg-gray-50">
              {stageDeals.map(deal => (
                <div key={deal.id} className="bg-white p-3 rounded shadow-sm mb-2 border border-gray-200 cursor-grab">
                  <h4 className="font-medium text-sm text-gray-800">{deal.title}</h4>
                  {deal.value ? (
                    <p className="text-xs text-green-600 font-medium mt-2">
                      💰 {formatCurrency(deal.value)}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="p-3 border-t">
              {activeStage === stage.id ? (
                <div className="space-y-2">
                  <input
                    autoFocus
                    type="text"
                    value={newDealTitle}
                    onChange={e => setNewDealTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddDeal(stage.id)}
                    placeholder="Título do negócio..."
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddDeal(stage.id)}
                      className="flex-1 bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600"
                    >
                      Adicionar
                    </button>
                    <button
                      onClick={() => setActiveStage(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActiveStage(stage.id)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 py-2 rounded transition-colors"
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
