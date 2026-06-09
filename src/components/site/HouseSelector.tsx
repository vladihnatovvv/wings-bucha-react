import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Link } from "@tanstack/react-router";
import {
  Bed,
  Ruler,
  ArrowRight,
  Check,
  Scale,
  Home as HomeIcon,
  Building2,
  Trees,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { HOUSES, fmtUsd, fmtUah, readCompare, writeCompare, type House } from "@/lib/houses";

const FILTERS = [
  { id: "all", label: "Всі формати", icon: Sparkles },
  { id: "duplex", label: "Дуплекси", icon: HomeIcon },
  { id: "townhouse", label: "Таунхауси", icon: Building2 },
  { id: "cottage", label: "Котеджі", icon: Trees },
] as const;

export function HouseSelector() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [active, setActive] = useState<House>(HOUSES[0]);
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    setCompare(readCompare());
  }, []);

  useEffect(() => {
    writeCompare(compare);
  }, [compare]);

  const visible = useMemo(
    () => (filter === "all" ? HOUSES : HOUSES.filter((h) => h.type === filter)),
    [filter],
  );

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <section id="houses" className="relative bg-secondary/50 py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-8 bg-primary" /> Обрати дім
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              Інтерактивний вибір
              <br />
              <span className="text-shimmer">вашого формату</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Фільтруйте формати, порівнюйте до 3 варіантів і обирайте дім, що пасує саме вам.
            </p>
          </Reveal>

          {compare.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Link
                to="/compare"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-soft hover:scale-[1.02] transition-transform"
              >
                <Scale className="h-4 w-4" />
                Порівняти ({compare.length})
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>

        <LayoutGroup>
          <div className="mt-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive ? "text-primary-foreground" : "text-foreground hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-animated shadow-soft"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-2">
                    <f.icon className="h-4 w-4" /> {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <LayoutGroup>
            <motion.div layout className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {visible.map((h) => {
                  const isActive = active.id === h.id;
                  const inCompare = compare.includes(h.id);
                  return (
                    <motion.article
                      key={h.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setActive(h)}
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-card p-5 transition-all ${
                        isActive
                          ? "border-primary shadow-soft"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-house-indicator"
                          className="absolute inset-y-0 left-0 w-1 bg-gradient-green"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary"
                        >
                          <img src={h.img} alt={h.name} className="h-full w-full object-cover" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-base font-bold leading-snug">{h.name}</h3>
                            <span className="shrink-0 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-forest">
                              {h.available} вільно
                            </span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Ruler className="h-3 w-3" /> {h.area} м²
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Bed className="h-3 w-3" /> {h.beds}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="text-sm font-bold text-foreground">
                              {fmtUsd(h.priceUsd)}
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCompare(h.id);
                              }}
                              disabled={!inCompare && compare.length >= 3}
                              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all ${
                                inCompare
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-40"
                              }`}
                            >
                              {inCompare ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Scale className="h-3 w-3" />
                              )}
                              {inCompare ? "У порівнянні" : "Порівняти"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
              {visible.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  За цим фільтром поки немає варіантів.
                </div>
              )}
            </motion.div>
          </LayoutGroup>

          <div className="relative">
            <div className="sticky top-28 overflow-hidden rounded-3xl bg-card shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <motion.img
                      key={active.img}
                      src={active.img}
                      alt={active.name}
                      initial={{ scale: 1.15, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <motion.h3
                        key={"t-" + active.id}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-2xl font-bold md:text-3xl"
                      >
                        {active.name}
                      </motion.h3>
                      <motion.div
                        key={"p-" + active.id}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="mt-1 text-sm opacity-90"
                      >
                        {fmtUsd(active.priceUsd)} • ≈ {fmtUah(active.priceUsd)}
                      </motion.div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-4 gap-3 border-b border-border pb-5">
                      <Spec label="Площа" value={`${active.area} м²`} />
                      <Spec label="Спальні" value={String(active.beds)} />
                      <Spec label="Поверхи" value={String(active.floors)} />
                      <Spec label="Ділянка" value={`${active.plot} сот`} />
                    </div>

                    <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {active.features.map((f, i) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-forest">
                            <Check className="h-3 w-3" />
                          </span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#contact"
                        onClick={() => sessionStorage.setItem("house_interest", active.name)}
                        className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-[0_20px_40px_-15px_oklch(0.5_0.07_150/0.5)]"
                      >
                        Залишити заявку на {active.name.split(" ")[0]}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                      <button
                        onClick={() => toggleCompare(active.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <Scale className="h-4 w-4" />
                        {compare.includes(active.id) ? "У порівнянні" : "Додати до порівняння"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold text-foreground md:text-xl">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
