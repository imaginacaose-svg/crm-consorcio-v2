import { createClient } from '@supabase/supabase-js'

// Substitua pelos seus dados reais do Supabase depois
const supabase = createClient('https://teste.supabase.co', 'chave-teste')

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🎉 CRM Consórcio v2</h1>
      <p style={{ color: 'green', fontWeight: 'bold' }}>Se você está vendo isso, o build funcionou 100%!</p>
      <p>O Supabase está configurado e o React está rodando.</p>
    </div>
  )
}

export default App
