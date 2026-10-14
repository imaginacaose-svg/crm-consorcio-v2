import { useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard';

type MenuItem = { id: string; label: string; icon: string };

const MENU: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'kanban', label: 'Pipeline (Kanban)', icon: '📋' },
  { id: 'clientes', label: 'Clientes', icon: '👥' },
  { id: 'relatorios', label: 'Relatórios', icon: '📈' },
  { id: 'config', label: 'Configurações', icon: '⚙️' },
];

export default function App() {
  const [active, setActive] = useState('kanban');
  const currentTitle = MENU.find(m => m.id === active)?.label ?? 'Pipeline';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>

      {/* MENU LATERAL */}
      <aside style={{ width: 240, flexShrink: 0, background: '#0f172a', color: '#e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '28px 22px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>CRM Consórcio</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Gestão comercial</div>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {MENU.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '12px 14px', marginBottom: 6,
                border: 'none', borderLeft: active === item.id ? '3px solid #38bdf8' : '3px solid transparent',
                borderRadius: 6, cursor: 'pointer', textAlign: 'left', fontSize: 14,
                background: active === item.id ? '#1e293b' : 'transparent',
                color: active === item.id ? '#ffffff' : '#94a3b8',
                fontWeight: active === item.id ? 600 : 400,
              }}
            >
              <span style={{ fontSize: 17 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '18px 22px', fontSize: 11, color: '#64748b', borderTop: '1px solid #1e293b' }}>
          ✅ BUILD 5 — FUNCIONANDO
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div style={{ flex: 1, minWidth: 0 }}>

        <header style={{ background: '#ffffff', padding: '20px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{currentTitle}</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>Acompanhe suas negociações em um só lugar</p>
          </div>
          <div style={{ background: '#f1f5f9', borderRadius: 999, padding: '8px 16px', fontSize: 13, color: '#334155' }}>
            👤 Minha Equipe
          </div>
        </header>

        <main style={{ padding: 28 }}>

          {active === 'kanban' && <KanbanBoard />}

          {active !== 'kanban' && (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 32 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: 18, color: '#0f172a' }}>{currentTitle}</h2>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                Esta tela será conectada ao Supabase a seguir. Por enquanto, use o menu <strong>Pipeline (Kanban)</strong>.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
