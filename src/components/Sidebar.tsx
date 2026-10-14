import { useState } from 'react'

interface SidebarProps {
  activeMenu: string
  onMenuChange: (menu: string) => void
}

export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'kanban', label: 'Kanban', icon: '📋' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'relatorios', label: 'Relatórios', icon: '📈' },
    { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">CRM Consórcio</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão de Vendas</p>
      </div>
      <nav className="p-4">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
              activeMenu === item.id
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
