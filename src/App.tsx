import { KanbanBoard } from './components/KanbanBoard'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ padding: '20px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
          🎯 CRM Consórcio - Kanban
        </h1>
        <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>
          Gerencie seus leads e negociações
        </p>
      </div>
      <KanbanBoard />
    </div>
  )
}

export default App
