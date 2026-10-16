import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { getProfile, signOut } from "./lib/api";
import type { Profile } from "./lib/types";
import Login from "./pages/Login";
import Pipeline from "./pages/Pipeline";
import FollowUps from "./pages/FollowUps";
import Relatorios from "./pages/Relatorios";
import Equipe from "./pages/Equipe";

type Pagina = "pipeline" | "followups" | "relatorios" | "equipe";

const NAV: { id: Pagina; label: string; icone: string }[] = [
  { id: "pipeline", label: "Pipeline", icone: "🗂️" },
  { id: "followups", label: "Follow-ups", icone: "⏰" },
  { id: "relatorios", label: "Relatórios", icone: "📊" },
  { id: "equipe", label: "Equipe", icone: "👥" },
];

export default function App() {
  const [sessao, setSessao] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [pagina, setPagina] = useState<Pagina>("pipeline");

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSessao(data.session);
      if (data.session) setProfile(await getProfile());
      setCarregandoSessao(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSessao(session);
      setProfile(session ? await getProfile() : null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (carregandoSessao) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">
        Carregando…
      </div>
    );
  }

  if (!sessao) return <Login />;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white">🤝</div>
          <div>
            <p className="text-sm font-bold leading-tight text-slate-800">ConsórcioCRM</p>
            <p className="text-[11px] text-slate-400">Pipeline & Leads</p>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setPagina(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                pagina === item.id ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{item.icone}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <div className="mb-2 flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              {(profile?.nome ?? "?").trim()[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-700">{profile?.nome ?? sessao.user.email}</p>
              <p className="truncate text-[11px] capitalize text-slate-400">{profile?.role ?? "membro"}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile header */}
        <header className="sticky top-0 z-40 flex items-center gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:hidden">
          <span className="mr-2 shrink-0 text-sm font-bold text-slate-800">🤝 CRM</span>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setPagina(item.id)}
              className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                pagina === item.id ? "bg-indigo-50 text-indigo-700" : "text-slate-500"
              }`}
            >
              {item.icone} {item.label}
            </button>
          ))}
          <button onClick={() => signOut()} className="ml-auto shrink-0 rounded-lg px-2 py-1.5 text-xs text-slate-400">
            Sair
          </button>
        </header>

        <div className="mx-auto max-w-7xl p-4 md:p-6">
          {pagina === "pipeline" && <Pipeline profile={profile} />}
          {pagina === "followups" && <FollowUps profile={profile} />}
          {pagina === "relatorios" && <Relatorios />}
          {pagina === "equipe" && <Equipe />}
        </div>
      </main>
    </div>
  );
}
