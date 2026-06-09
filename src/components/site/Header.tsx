import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-wings.png";

const nav = [
  { to: "#about", label: "Про комплекс" },
  { to: "#houses", label: "Будинки" },
  { to: "#financing", label: "єОселя" },
  { to: "#location", label: "Локація" },
  { to: "#docs", label: "Документи" },
  { to: "#contact", label: "Контакти" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Wings Bucha"
            className="h-9 w-9 md:h-10 md:w-10"
            width={40}
            height={40}
          />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight md:text-base">WINGS BUCHA</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs">
              Крила Бучі
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.to}
              href={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+380000000000"
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            <Phone className="h-4 w-4" /> +38 (000) 000-00-00
          </a>
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            Записатись на огляд
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Меню">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <a
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Записатись на огляд
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
