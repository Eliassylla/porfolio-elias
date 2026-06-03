import heroPortrait from "@/assets/hero-portrait-real.jpg";
import { businessInfo } from "@/data/business";

export function EliasCard() {
  return (
    <aside
      aria-label="Carte de présentation d'Elias"
      className="relative inline-flex w-[23rem] overflow-hidden rounded-[1.9rem] border border-border/80 bg-card shadow-2xl shadow-foreground/10 dark:border-white/10 dark:bg-[#0f1011] md:w-[25rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(94,106,210,0.18),transparent_36%),linear-gradient(135deg,rgba(16,185,129,0.08),transparent_42%)]" />

      <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 backdrop-blur-sm dark:text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Disponible
      </div>

      <div className="relative flex w-full items-center gap-5 p-4 pr-5 md:gap-6 md:p-5 md:pr-6">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-[1.6rem] bg-gradient-to-br from-emerald-400/25 to-violet-500/20 blur-sm" />
          <img
            src={heroPortrait}
            alt="Portrait d'Elias"
            className="relative h-32 w-28 rounded-[1.4rem] border border-white/70 object-cover object-[50%_15%] shadow-sm dark:border-white/10 md:h-36 md:w-32"
          />
        </div>

        <div className="min-w-0 pt-7 text-left md:pt-8">
          <p className="text-4xl font-semibold leading-none tracking-tight text-card-foreground md:text-[2.75rem]">
            {businessInfo.name}
          </p>
          <p className="mt-2.5 max-w-[18ch] whitespace-normal text-base leading-snug text-muted-foreground md:text-lg">
            Consultant en systèmes opérationnels
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground dark:bg-white/[0.06]">
              Petites équipes
            </span>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground dark:bg-white/[0.06]">
              Process clairs
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
