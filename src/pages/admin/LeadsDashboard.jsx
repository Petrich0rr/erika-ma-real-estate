import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { base44 } from "@/api/base44Client";
import { siteConfig } from "@/lib/siteConfig";
import { Loader2, ExternalLink, LogOut, Mail, Phone } from "lucide-react";

const STATUSES = ["New", "Contacted", "Follow-Up", "Active Client", "Closed", "Not Qualified"];

const fmtDate = (d) => (d ? new Date(d).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" }) : "—");

function sourceOf(l) {
  return l.utm_source || (l.referrer && l.referrer !== "direct" ? l.referrer : "Direct");
}

export default function LeadsDashboard() {
  const [me, setMe] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [savingId, setSavingId] = useState(null);
  const [notesDraft, setNotesDraft] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const user = await base44.auth.me().catch(() => null);
        setMe(user);
        if (user && user.role === "admin") {
          const list = await base44.entities.Lead.list("-created_date", 500);
          // Guard: a non-array response must never reach render.
          const safeList = Array.isArray(list) ? list : [];
          setLeads(safeList);
          const drafts = {};
          safeList.forEach((l) => (drafts[l.id] = l.notes || ""));
          setNotesDraft(drafts);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const fresh = leads.filter((l) => l.status === "New").length;
    const buyers = leads.filter((l) => ["Buyer Inquiry", "Buying", "Buying & Selling"].includes(l.lead_type)).length;
    const sellers = leads.filter((l) => ["Seller Inquiry", "Selling"].includes(l.lead_type)).length;
    const bySource = {};
    leads.forEach((l) => {
      const s = sourceOf(l);
      bySource[s] = (bySource[s] || 0) + 1;
    });
    const byStatus = {};
    leads.forEach((l) => (byStatus[l.status] = (byStatus[l.status] || 0) + 1));
    return { total, fresh, buyers, sellers, bySource, byStatus };
  }, [leads]);

  const chartData = useMemo(
    () => Object.entries(stats.bySource).map(([name, value]) => ({ name, value })),
    [stats]
  );

  const filtered = filter === "All" ? leads : leads.filter((l) => l.status === filter);

  const changeStatus = async (lead, status) => {
    try {
      await base44.entities.Lead.update(lead.id, { status });
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    } catch (e) {
      /* keep */
    }
  };

  const saveNote = async (lead) => {
    setSavingId(lead.id);
    try {
      await base44.entities.Lead.update(lead.id, { notes: notesDraft[lead.id] || "" });
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, notes: notesDraft[lead.id] || "" } : l)));
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (!me || me.role !== "admin") {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Admin access required</h1>
          <p className="text-muted-foreground mt-3">This area is private. Sign in with an admin account to manage leads.</p>
          <Link to="/" className="btn-primary mt-6 inline-flex">Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 h-16 flex items-center justify-between">
          <div>
            <span className="font-heading text-lg">Lead Dashboard</span>
            <span className="text-muted-foreground text-sm ml-3 hidden sm:inline">{siteConfig.agentName}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5">
              <ExternalLink size={14} /> Site
            </Link>
            <button onClick={() => base44.auth.logout("/")} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Stat label="Total Leads" value={stats.total} />
          <Stat label="New" value={stats.fresh} accent />
          <Stat label="Buyer Leads" value={stats.buyers} />
          <Stat label="Seller Leads" value={stats.sellers} />
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          <section className="lg:col-span-7 bg-card border border-border p-6">
            <h2 className="font-heading text-xl mb-4">Leads by source</h2>
            {chartData.length === 0 ? (
              <p className="text-muted-foreground text-sm">No leads yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} margin={{ left: -16, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 0, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </section>
          <section className="lg:col-span-5 bg-card border border-border p-6">
            <h2 className="font-heading text-xl mb-4">By status</h2>
            <ul className="space-y-2.5">
              {STATUSES.map((s) => (
                <li key={s} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s}</span>
                  <span className="font-heading text-lg">{stats.byStatus[s] || 0}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.12em] border transition-colors ${
                filter === s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s} {s !== "All" && <span className="opacity-60">({stats.byStatus[s] || 0})</span>}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-border overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-muted-foreground text-xs uppercase tracking-[0.12em] border-b border-border">
                <th className="p-4 font-medium">Lead</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Source</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">No leads to show.</td>
                </tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 align-top">
                  <td className="p-4">
                    <div className="font-medium text-foreground">{l.name}</div>
                    <a href={`mailto:${l.email}`} className="text-primary text-xs flex items-center gap-1 mt-1 hover:underline"><Mail size={11} /> {l.email}</a>
                    {l.phone && <a href={`tel:${l.phone}`} className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5 hover:text-foreground"><Phone size={11} /> {l.phone}</a>}
                    {l.message && <p className="text-muted-foreground text-xs mt-2 max-w-xs">{l.message}</p>}
                  </td>
                  <td className="p-4 text-muted-foreground">{l.lead_type || "—"}</td>
                  <td className="p-4">
                    <span className="inline-block border border-primary/40 text-primary text-[0.65rem] px-2 py-1 uppercase tracking-[0.1em]">{sourceOf(l)}</span>
                  </td>
                  <td className="p-4 text-muted-foreground whitespace-nowrap">{fmtDate(l.created_date)}</td>
                  <td className="p-4">
                    <select
                      value={l.status || "New"}
                      onChange={(e) => changeStatus(l, e.target.value)}
                      className="bg-background border border-border text-foreground px-2 py-1.5 text-xs focus:border-primary focus:outline-none"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4 min-w-[220px]">
                    <textarea
                      value={notesDraft[l.id] || ""}
                      onChange={(e) => setNotesDraft((d) => ({ ...d, [l.id]: e.target.value }))}
                      onBlur={() => saveNote(l)}
                      rows={2}
                      placeholder="Add a private note…"
                      className="w-full bg-background border border-border text-foreground px-2 py-1.5 text-xs resize-none focus:border-primary focus:outline-none"
                    />
                    {savingId === l.id && <span className="text-[0.65rem] text-primary">Saving…</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className={`bg-card border p-5 ${accent ? "border-primary" : "border-border"}`}>
      <p className="text-muted-foreground text-xs uppercase tracking-[0.12em]">{label}</p>
      <p className={`font-heading text-3xl mt-2 ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
    </div>
  );
}