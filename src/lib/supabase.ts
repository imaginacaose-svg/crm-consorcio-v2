import { createClient } from "@supabase/supabase-js";

// Variáveis de ambiente do Vite (defina em .env.local — nunca commite!)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase não configurado. Crie um arquivo .env.local com:\n" +
      "VITE_SUPABASE_URL=https://XXXX.supabase.co\n" +
      "VITE_SUPABASE_ANON_KEY=chave-anon-publica"
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
