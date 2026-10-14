import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { KanbanBoard } from './components/KanbanBoard'

function App() {
  const [activeMenu, setActiveMenu] = useState('kanban')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="flex-1">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeMenu === 'dashboard' && '📊 Dashboard'}
            {activeMenu === 'kanban' && '📋 Pipeline de Vendas'}
            {activeMenu === 'clientes' && '👥 Clientes'}
            {activeMenu === 'relatorios' && '📈 Relatórios'}
            {activeMenu === 'configuracoes' && '⚙️ Configurações'}
          </h2>
        </header>
        <main className="p-8">
          {activeMenu === 'kanban' && <KanbanBoard />}
          {activeMenu === 'dashboard' && (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Dashboard em construção...</p>
            </div>
          )}
          {activeMenu === 'clientes' && (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Lista de clientes em construção...</p>
            </div>
          )}
          {activeMenu === 'relatorios' && (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Relatórios em construção...</p>
            </div>
          )}
          {activeMenu === 'configuracoes' && (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Configurações em construção...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
