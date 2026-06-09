import logo from "@/assets/logo-wings.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" className="h-10 w-10" width={40} height={40} />
              <div>
                <div className="text-base font-bold">WINGS BUCHA</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Крила Бучі
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Сучасний житловий комплекс серед лісу, у 15 хвилинах від Києва. Дім, де народжуються
              крила.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Контакти</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+380000000000" className="hover:text-primary">
                  +38 (000) 000-00-00
                </a>
              </li>
              <li>
                <a href="mailto:info@wingsbucha.com" className="hover:text-primary">
                  info@wingsbucha.com
                </a>
              </li>
              <li>м. Буча, вул. Лісова, 28</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Забудовник</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>ТОВ «Крила Бучі Девелопмент»</li>
              <li>ЄДРПОУ: 44851237</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Wings Bucha. Усі права захищені.</span>
          <span>Світла, мінімалістична та природна архітектура</span>
        </div>
      </div>
    </footer>
  );
}
